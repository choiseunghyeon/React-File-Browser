import { createReducer } from "@reduxjs/toolkit"
import { changeCurrentNodeId, changeCurrentNodeIdByHistory, hideSideBarNode, showSideBarNode, updateNodes, updateSideNodes } from "./action"
import { getParentNodeListById } from "./utils"

export interface IFlatMap {
  [id: NodeId]: INode
}
export interface ISideBarMap {
  [id: NodeId]: ISideBarNode
}
export interface ISideBarNode {
  id: NodeId
  showChildren: true | false | null
  selected?: boolean
}
export type NodeId = string
export type NodeType = "dir" | "file"
export interface INode {
  id: NodeId
  name: string
  type: NodeType
  parentId: string | null
  children: NodeId[] | null
}
export interface IState {
  // init 단계에서 nodeId 없음
  currentNodeId: NodeId | null
  sideBarMap: ISideBarMap
  flatMap: IFlatMap
  history: NodeId[]
  historyIndex: number
}

export const rootNodeId = "root"
const root: IState = {
  currentNodeId: null,
  sideBarMap: {
    root: {
      id: "root",
      showChildren: false,
    },
  },
  flatMap: {
    root: {
      id: "root",
      name: "C:/BUIS_HOME",
      type: "dir",
      parentId: null,
      children: null,
    },
  },
  history: [],
  historyIndex: 0,
}

// layout
const rootReducer = createReducer(root, builder => {
  builder
    .addCase(changeCurrentNodeId, (state, action) => {
      const nodeId = action.payload
      const prevNodeId = state.currentNodeId
      state.currentNodeId = nodeId

      const sideNode = state.sideBarMap[nodeId]
      if (sideNode) {
        showSideBarNodesUntilTargetNodeVisible(nodeId, state.sideBarMap, state.flatMap)

        selectSideBarNode(prevNodeId, nodeId, state.sideBarMap)
      }

      // historyIndex 기준으로 쌓기
      // 이미 쌓여있다면 다 없애기
      stackHistoryFromIndex(nodeId, state.history, state.historyIndex)
    })
    .addCase(showSideBarNode, (state, action) => {
      const nodeId = action.payload
      state.sideBarMap[nodeId].showChildren = true
    })
    .addCase(updateSideNodes, (state, action) => {
      const sideNodes = action.payload
      sideNodes.forEach(sideNode => {
        state.sideBarMap[sideNode.id] = sideNode
      })
    })
    .addCase(hideSideBarNode, (state, action) => {
      const nodeId = action.payload
      state.sideBarMap[nodeId].showChildren = false
    })
    .addCase(updateNodes, (state, action) => {
      const { nodes, parentId } = action.payload

      if (parentId) {
        if (!state.flatMap[parentId].children) state.flatMap[parentId].children = []
        const nodeIds = nodes.map(node => node.id)
        const addableNodeIds = nodeIds.filter(nodeId => state.flatMap[parentId].children?.every(childId => nodeId !== childId))
        state.flatMap[parentId].children?.push(...addableNodeIds)
      }

      nodes.forEach(node => (state.flatMap[node.id] = node))
    })
})

function showSideBarNodesUntilTargetNodeVisible(nodeId: string, sideBarMap: ISideBarMap, flatMap: IFlatMap) {
  // 보여지는 상태가 아니면 보여지도록 수정
  const parentNodeList = getParentNodeListById(flatMap, nodeId)
  if (!parentNodeList) return
  // 자기 자신 제외 상위 sideNode showChildren true로 전환
  parentNodeList.pop()
  const nodeIds = parentNodeList.map(node => node.id)
  const sideNodeListWithHideChildren = nodeIds.filter(nodeId => !sideBarMap[nodeId].showChildren)
  sideNodeListWithHideChildren.forEach(nodeId => (sideBarMap[nodeId].showChildren = true))
}

function selectSideBarNode(prevNodeId: string | null, nodeId: string, sideBarMap: ISideBarMap) {
  if (prevNodeId && sideBarMap[prevNodeId]) sideBarMap[prevNodeId].selected = false
  sideBarMap[nodeId].selected = true
}

function stackHistoryFromIndex(nodeId: NodeId, history: NodeId[], index: number) {}

export default rootReducer

// sidebar 동작 방식
// 탐색된 경우 무조건 보여주기(fold면 unfold)
// 탐색 안된 경우 select 변하지 않음 -> 탐색된 경우 select 변경

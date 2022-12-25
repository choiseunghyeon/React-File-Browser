import { createAction, createReducer } from "@reduxjs/toolkit"
import { state } from "./tempState"
import { createNodeFromFile, createSideBarNodeFromNode, getChilrenDirNodeList, getParentNodeListById, IFile, isDirectory } from "./utils"

export interface IState {
  // path: string
  // init 단계에서 nodeId 없음
  currentNodeId: string | null
  sideBarMap: {
    [id: NodeId]: ISideBarNode
  }
  flatMap: IFlatMap
}

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
}
interface IUpdateNodesFromFilesPayload {
  files: IFile[]
  parentId: string | null
}

type IUpdateSideNodesPayload = ISideBarNode[]
type IUpdateNodesPayload = {
  parentId: string
  nodes: INode[]
}
export const changeCurrentNodeId = createAction<NodeId>("node/changeCurrentNodeId")
export const showSideBarNode = createAction<NodeId>("node/showSideBarNode")
export const hideSideBarNode = createAction<NodeId>("node/hideSideBarNode")
export const updateNodesFromFiles = createAction<IUpdateNodesFromFilesPayload>("node/updateNodesFromFiles")
export const updateNodes = createAction<IUpdateNodesPayload>("node/updateNodes")
export const updateSideNodes = createAction<IUpdateSideNodesPayload>("sideNode/updateSideNodes")
export const showError = createAction<string>("node/showError")
// layout
const rootReducer = createReducer(root, builder => {
  builder
    .addCase(changeCurrentNodeId, (state, action) => {
      const nodeId = action.payload
      const prevNodeId = state.currentNodeId
      state.currentNodeId = nodeId

      const sideNode = state.sideBarMap[nodeId]
      if (sideNode) {
        const parentNodeList = getParentNodeListById(state.flatMap, nodeId)
        if (!parentNodeList) return
        // 자기 자신 제외 상위 sideNode showChildren true로 전환
        parentNodeList.pop()
        const nodeIds = parentNodeList.map(node => node.id)
        const sideNodeListWithHideChildren = nodeIds.filter(nodeId => !state.sideBarMap[nodeId].showChildren)
        sideNodeListWithHideChildren.forEach(nodeId => (state.sideBarMap[nodeId].showChildren = true))

        if (prevNodeId && state.sideBarMap[prevNodeId]) state.sideBarMap[prevNodeId].selected = false
        state.sideBarMap[nodeId].selected = true
      }
    })
    .addCase(showSideBarNode, (state, action) => {
      const nodeId = action.payload
      state.sideBarMap[nodeId].showChildren = true

      // // sidebarMap 없으면 만들기
      // const dirNodes = getChilrenDirNodeList(state.flatMap, nodeId)
      // if (!dirNodes) return
      // dirNodes.forEach(node => {
      //   const sideBarNode = createSideBarNodeFromNode(node)
      //   state.sideBarMap[node.id] = sideBarNode
      // })
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
    .addCase(updateNodesFromFiles, (state, action) => {
      const { files, parentId } = action.payload
      const nodes = files.map(file => createNodeFromFile(file, parentId))

      if (parentId) {
        const nodeIds = nodes.map(node => node.id)
        state.flatMap[parentId].children = nodeIds
      }

      nodes.forEach(node => (state.flatMap[node.id] = node))
    })
    .addCase(updateNodes, (state, action) => {
      const { nodes, parentId } = action.payload

      if (parentId) {
        const nodeIds = nodes.map(node => node.id)
        state.flatMap[parentId].children = nodeIds
      }

      nodes.forEach(node => (state.flatMap[node.id] = node))
    })
})

export default rootReducer

// sidebar 동작 방식
// 탐색된 경우 무조건 보여주기(fold면 unfold)
// 탐색 안된 경우 select 변하지 않음 -> 탐색된 경우 select 변경

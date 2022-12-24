import { createAction, createReducer } from "@reduxjs/toolkit"
import { state } from "./tempState"
import { getParentNodeListById } from "./utils"

export interface IState {
  // path: string
  currentNodeId: string
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
  showChildren: boolean
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

export const rootNodeId = "1"

const root: IState = state
export const changeCurrentNodeId = createAction<NodeId>("node/changeCurrentNodeId")
export const toggleSideBarNode = createAction<NodeId>("node/toggleSideBarNode")
// layout
const rootReducer = createReducer(root, builder => {
  builder
    .addCase(changeCurrentNodeId, (state, action) => {
      const prevNodeId = state.currentNodeId
      const nodeId = action.payload
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

        state.sideBarMap[prevNodeId].selected = false
        state.sideBarMap[nodeId].selected = true
      }
    })
    .addCase(toggleSideBarNode, (state, action) => {
      const nodeId = action.payload
      state.sideBarMap[nodeId].showChildren = !state.sideBarMap[nodeId].showChildren
    })
})

export default rootReducer

// sidebar 동작 방식
// 탐색된 경우 무조건 보여주기(fold면 unfold)
// 탐색 안된 경우 select 변하지 않음 -> 탐색된 경우 select 변경

import { createAction } from "@reduxjs/toolkit"
import { INode, ISideBarNode, NodeId } from "./reducer"

const CHANGE_CURRENT_NODE_ID = "node/changeCurrentNodeId"
const SHOW_SIDE_BAR_NODE = "node/showSideBarNode"
const HIDE_SIDE_BAR_NODE = "node/hideSideBarNode"
const UPDATE_NODES = "node/updateNodes"
const UPDATE_SIDE_NODES = "sideNode/updateSideNodes"
const SHOW_ERROR = "node/showError"
export const ActionType = { CHANGE_CURRENT_NODE_ID, SHOW_SIDE_BAR_NODE, HIDE_SIDE_BAR_NODE, UPDATE_NODES, UPDATE_SIDE_NODES }

type IUpdateSideNodesPayload = ISideBarNode[]
type IUpdateNodesPayload = {
  parentId: string
  nodes: INode[]
}
export const changeCurrentNodeId = createAction<NodeId>(CHANGE_CURRENT_NODE_ID)
export const showSideBarNode = createAction<NodeId>(SHOW_SIDE_BAR_NODE)
export const hideSideBarNode = createAction<NodeId>(HIDE_SIDE_BAR_NODE)
export const updateNodes = createAction<IUpdateNodesPayload>(UPDATE_NODES)
export const updateSideNodes = createAction<IUpdateSideNodesPayload>(UPDATE_SIDE_NODES)
export const showError = createAction<string>(SHOW_ERROR)

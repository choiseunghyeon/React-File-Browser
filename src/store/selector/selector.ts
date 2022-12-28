import { createSelector } from "@reduxjs/toolkit"
import { RootState } from ".."
import { IFlatMap, ISideBarMap, ISideBarNode, NodeId } from "../reducer"
import { getChildrenById, getChilrenDirNodeList, getParentNodeListById } from "../utils"

export const selectFlatMap = (state: RootState) => state.flatMap
const selectSideBarMap = (state: RootState) => state.sideBarMap
export const selectCurrentNodeId = (state: RootState) => state.currentNodeId
export const selectHistory = (state: RootState) => state.history
export const selectHistoryIndex = (state: RootState) => state.historyIndex

// pass prefix는 reselect에서 parameter 전달용 (state, id) => id의 경우 id 전달용 함수
const passNodeId = (state: RootState, id: string) => id

export const selectCurrentNodeChildren = createSelector([selectFlatMap, selectCurrentNodeId], (flatMap, id) => {
  const children = getChildrenById(flatMap, id)
  if (!children) return null

  return children
})

export const selectDirChildrenById = createSelector([selectFlatMap, passNodeId], (flatMap, id) => {
  const children = getChildrenById(flatMap, id)
  if (!children) return null

  const dirChildren = children.filter(node => node.type === "dir")
  if (dirChildren.length === 0) return null
  return dirChildren
})

export const selectNodeById = createSelector([selectFlatMap, passNodeId], (flatMap: IFlatMap, nodeId: string) => {
  return flatMap[nodeId]
})

export interface IComponentSideBarNode extends ISideBarNode {
  name: string
  sideNodeIds: string[] | null
}

export const selectSideBarNodeById = createSelector([selectFlatMap, selectSideBarMap, passNodeId], (flatMap: IFlatMap, sideBarMap: ISideBarMap, nodeId: string): IComponentSideBarNode => {
  // name children showChildren selected
  const { name } = flatMap[nodeId]
  const { showChildren, selected } = sideBarMap[nodeId]
  const dirChildren = getChilrenDirNodeList(flatMap, nodeId)
  let sideNodeIds: string[] | null = null
  if (dirChildren) {
    const dirIds = dirChildren.map(dir => dir.id)
    const sideNodes = dirIds.map(nodeId => sideBarMap[nodeId]).filter(sideNode => sideNode)
    sideNodeIds = sideNodes.map(sideNode => sideNode.id)
  }

  return { id: nodeId, name, showChildren, selected, sideNodeIds }
})

export interface IPath {
  id: NodeId
  name: string
  hasChildren: boolean
}
export const selectPaths = createSelector(
  [selectFlatMap, selectCurrentNodeId],

  (flatMap: IFlatMap, currentNodeId: string | null): IPath[] | null => {
    if (!currentNodeId) return null

    const nodes = getParentNodeListById(flatMap, currentNodeId)
    if (!nodes) return null
    const paths = nodes.map(node => {
      const hasChildren = node.children && node.children.length > 0 ? true : false
      return { id: node.id, name: node.name, hasChildren }
    })
    return paths
  }
)

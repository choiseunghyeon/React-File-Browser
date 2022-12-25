import { createSelector } from "@reduxjs/toolkit"
import { RootState } from ".."
import { IFlatMap, INode, ISideBarMap, ISideBarNode, NodeId, NodeType } from "../reducer"
import { getParentNodeListById, isDirectory } from "../utils"

export const selectFlatMap = (state: RootState) => state.flatMap
const selectSideBarMap = (state: RootState) => state.sideBarMap
export const selectCurrentNodeId = (state: RootState) => {
  return state.currentNodeId
}

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

export const selectSideBarNodeById = createSelector([selectSideBarMap, passNodeId], (sideBarMap: ISideBarMap, nodeId: string): ISideBarNode => {
  return sideBarMap[nodeId]
})

export interface IPath {
  id: NodeId
  name: string
  hasDirectory: boolean
}
export const selectPaths = createSelector(
  [selectFlatMap, selectCurrentNodeId],

  (flatMap: IFlatMap, currentNodeId: string | null): IPath[] | null => {
    if (!currentNodeId) return null

    const nodeList = getParentNodeListById(flatMap, currentNodeId)
    if (!nodeList) return null
    const paths = nodeList.map(node => {
      const children = getChildrenById(flatMap, node.id)
      const hasDirectory = children ? children.some(child => isDirectory(child.type)) : false
      return { id: node.id, name: node.name, hasDirectory }
    })
    return paths
  }
)

const getChildrenById = (map: IFlatMap, nodeId: string | null): INode[] | null => {
  if (!nodeId) return null

  const node = map[nodeId]
  if (!node.children) return null

  const children = node.children.map(childNodeId => map[childNodeId])
  return children
}

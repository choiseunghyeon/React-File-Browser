import { createSelector } from "@reduxjs/toolkit"
import { RootState } from ".."
import { IFlatMap, INode, ISideBarMap, ISideBarNode, NodeId, NodeType } from "../root"
import { isDirectory } from "../utils"

const selectFlatMap = (state: RootState) => state.flatMap
const selectSideBarMap = (state: RootState) => state.sideBarMap
export const selectCurrentNodeId = (state: RootState) => {
  return state.currentNodeId
}

// pass prefix는 reselect에서 parameter 전달용 (state, id) => id의 경우 id 전달용 함수
const passNodeId = (state: RootState, id: string) => id
export const selectChildrenById = createSelector([selectFlatMap, passNodeId], (flatMap, id) => {
  const children = getChildrenById(flatMap, id)
  if (!children) return null

  return children
})

export const selectDirChildrenById = createSelector([selectFlatMap, passNodeId], (flatMap, id) => {
  const children = getChildrenById(flatMap, id)
  if (!children) return null

  return children.filter(node => node.type === "dir")
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

  (flatMap: IFlatMap, currentNodeId: string): IPath[] | null => {
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

const getChildrenById = (map, nodeId): INode[] | null => {
  const node = map[nodeId]
  if (!node.children) return null

  const children = node.children.map(childNodeId => map[childNodeId])
  return children
}
const getParentNodeListById = (map, nodeId): INode[] | null => {
  let result: INode[] = []

  let node: INode = map[nodeId]
  if (!node) return null

  do {
    result.push({ ...node })
    if (node.parentId === null) {
      break
    } else {
      node = map[node.parentId]
    }
  } while (node)

  return result.reverse()
}

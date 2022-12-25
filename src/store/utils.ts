import { IFlatMap, INode, ISideBarNode, NodeType } from "./reducer"

export const isDirectory = (type: NodeType) => {
  return type === "dir"
}

export const getAbsolutePathIn = (map, id) => {
  let pathNames: string[] = []
  let node = map[id]

  while (node) {
    pathNames.push(node.name)
    node = map[node.parentId]
  }

  const result = pathNames.reverse().join("/")
  return result
}

export const getParentNodeListById = (map: IFlatMap, nodeId: string): INode[] | null => {
  let result: INode[] = []

  let node: INode = map[nodeId]
  if (!node) return null

  do {
    result.push(node)
    if (node.parentId === null) {
      break
    } else {
      node = map[node.parentId]
    }
  } while (node)

  return result.reverse()
}

export interface IFile {
  type: NodeType
  name: string
}
let nodeId = 1
export const createNodeFromFile = (file: IFile, parentId: string | null): INode => {
  return {
    id: "" + nodeId++,
    parentId,
    type: file.type,
    name: file.name,
    children: null,
  }
}

export const createSideBarNodeFromNode = (node: INode): ISideBarNode => {
  return {
    id: node.id,
    showChildren: false,
  }
}

export const getChilrenDirNodeList = (map: IFlatMap, nodeId: string): INode[] | null => {
  const childNodeIds = map[nodeId].children
  if (!childNodeIds) return null

  const dirNodeIds = childNodeIds.filter(nodeId => isDirectory(map[nodeId].type))
  if (dirNodeIds.length === 0) return null

  return dirNodeIds.map(nodeId => map[nodeId])
}

import { IFlatMap, INode, ISideBarNode, NodeType } from "./root"

export const isDirectory = (type: NodeType) => {
  return type === "dir"
}

export const getAbsolutePathIn = (flatMap, id) => {
  let result: string[] = []
  let node = flatMap[id]

  while (node) {
    result.push(node.name)
    node = flatMap[node.parentNodeId]
  }
  return result.reverse().join("/")
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

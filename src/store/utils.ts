import { NodeType } from "./root"

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

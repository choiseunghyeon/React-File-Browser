import { useCallback } from "react"
import { INode } from "../store/root"
import { isDirectory } from "../store/utils"
export interface IItemProps {
  node: INode
  onChangeNodeId: Function
}

//   {{
//     backgroundColor: selectedNodeId === node.id ? "grey" : "white"
// }}

export default function Item({ node, onChangeNodeId }: IItemProps) {
  const { id, name, type } = node
  const onDblClick = useCallback(() => {
    onChangeNodeId(id)
  }, [id])

  return (
    <div id={id} onDoubleClick={onDblClick}>
      <span>{isDirectory(type) ? "폴더" : "파일"}</span> {name}
    </div>
  )
}

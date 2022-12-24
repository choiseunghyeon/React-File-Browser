import { useCallback } from "react"
import { FILES_TEST_ID, FILE_TYPE_TEST_ID } from "../constants/test"
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
    <div data-testid={FILES_TEST_ID} id={id} onDoubleClick={onDblClick}>
      <span data-testid={FILE_TYPE_TEST_ID}>{isDirectory(type) ? "폴더" : "파일"}</span> {name}
    </div>
  )
}

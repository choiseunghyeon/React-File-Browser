import { useCallback } from "react"
import { FILES_TEST_ID, FILE_TYPE_TEST_ID } from "../constants/test"
import { INode } from "../store/reducer"
import { isDirectory } from "../store/utils"
export interface IFolderItemProps {
  node: INode
  onChangeNodeId: Function
}

export function FolderItem({ node, onChangeNodeId }: IFolderItemProps) {
  const { id, name } = node
  const onDblClick = useCallback(() => {
    onChangeNodeId(id)
  }, [id])

  return (
    <div data-testid={FILES_TEST_ID} id={id} onDoubleClick={onDblClick}>
      <span data-testid={FILE_TYPE_TEST_ID}>폴더</span> {name}
    </div>
  )
}

export interface IFilItemProps {
  node: INode
}
export function FileItem({ node }: IFilItemProps) {
  const { id, name } = node

  return (
    <div data-testid={FILES_TEST_ID} id={id}>
      <span data-testid={FILE_TYPE_TEST_ID}>파일</span> {name}
    </div>
  )
}

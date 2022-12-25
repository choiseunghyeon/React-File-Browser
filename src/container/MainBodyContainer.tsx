import { useCallback } from "react"
import { shallowEqual, useDispatch } from "react-redux"
import { FileItem, FolderItem } from "../components/Item"
import { useAppSelector } from "../store/hooks"
import { changeCurrentNodeId } from "../store/reducer"
import { selectCurrentNodeChildren } from "../store/selector/selector"
import { isDirectory } from "../store/utils"

export const MainBodyContainer = function () {
  const dispatch = useDispatch()
  const children = useAppSelector(selectCurrentNodeChildren, shallowEqual)
  const onChangeNodeId = useCallback((nodeId: string): void => {
    dispatch(changeCurrentNodeId(nodeId))
  }, [])
  if (!children) return null

  return (
    <div className="body">
      {children.map(node => {
        return isDirectory(node.type) ? <FolderItem key={node.id} node={node} onChangeNodeId={onChangeNodeId} /> : <FileItem key={node.id} node={node} />
      })}
    </div>
  )
}

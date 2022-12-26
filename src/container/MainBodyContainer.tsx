import { FileItem, FolderItem } from "../components/Item"
import { useChangeNodeId } from "../hooks"
import { useAppSelector } from "../store/hooks"
import { INode } from "../store/reducer"
import { selectCurrentNodeChildren } from "../store/selector/selector"
import { isDirectory } from "../store/utils"

export const MainBodyContainer = function () {
  const children = useAppSelector(selectCurrentNodeChildren)
  const onChangeNodeId = useChangeNodeId()
  if (!children) return null

  return (
    <div className="body">
      {children.map(node => {
        return isDirectory(node.type) ? <FolderItem key={node.id} node={node} onChangeNodeId={onChangeNodeId} /> : <FileItem key={node.id} node={node} />
      })}
    </div>
  )
}

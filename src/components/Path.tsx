import { memo, useCallback } from "react"
import { INode } from "../store/root"
import { IPath } from "../store/selector/selector"

export interface IPathProps {
  path: IPath
  onChangeNodeId: Function
}

export default memo(function Path({ path, onChangeNodeId }: IPathProps) {
  const { name, hasDirectory, id } = path
  const onClick = useCallback(() => {
    onChangeNodeId(id)
  }, [id])
  return (
    <div>
      <span>
        <span onClick={onClick}>{name}</span>
        {hasDirectory && (
          <div style={{ display: "inline-block" }}>
            <span> {" >"}</span>
          </div>
        )}
      </span>
    </div>
  )
})

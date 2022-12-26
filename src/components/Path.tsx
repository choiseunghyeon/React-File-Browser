import { memo, useCallback } from "react"
import { PATH_LAYER_BUTTON_TEST_ID, PATH_TEST_ID } from "../constants/test"
import { IPath } from "../store/selector/selector"

export interface IPathProps {
  path: IPath
  onChangeNodeId: Function
}

export default memo(function Path({ path, onChangeNodeId }: IPathProps) {
  const { name, hasChildren, id } = path
  const onClick = useCallback(() => {
    onChangeNodeId(id)
  }, [id])
  return (
    <div data-testid={PATH_TEST_ID}>
      <span>
        <span onClick={onClick}>{name}</span>
        {hasChildren && (
          <div style={{ display: "inline-block" }} data-testid={PATH_LAYER_BUTTON_TEST_ID}>
            <span> {" >"}</span>
          </div>
        )}
      </span>
    </div>
  )
})

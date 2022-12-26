import { useCallback } from "react"
import { changeCurrentNodeId } from "../store/action"
import { useAppDispatch } from "../store/hooks"

export const useChangeNodeId = () => {
  const dispatch = useAppDispatch()
  const onChangeNodeId = useCallback((nodeId: string): void => {
    dispatch(changeCurrentNodeId(nodeId))
  }, [])
  return onChangeNodeId
}

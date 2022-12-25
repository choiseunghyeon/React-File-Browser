import { useCallback } from "react"
import { useAppDispatch } from "../store/hooks"
import { changeCurrentNodeId } from "../store/reducer"

export const useChangeNodeId = () => {
  const dispatch = useAppDispatch()
  const onChangeNodeId = useCallback((nodeId: string): void => {
    dispatch(changeCurrentNodeId(nodeId))
  }, [])
  return onChangeNodeId
}

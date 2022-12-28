import { changeCurrentNodeIdByHistory } from "../store/action"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { selectHistory, selectHistoryIndex } from "../store/selector/selector"

function isMoveablePrevNode(arr, index) {
  if (arr.length === 0) return false
  if (!arr[index - 1]) return false

  return true
}
function isMoveableNextNode(arr, index) {
  if (arr.length === 0) return false
  if (!arr[index + 1]) return false

  return true
}

function HistoryContainer() {
  const dispatch = useAppDispatch()
  const history = useAppSelector(selectHistory)
  const index = useAppSelector(selectHistoryIndex)

  const onChangePrevHistory = () => {
    const nodeId = history[index - 1]
    dispatch(changeCurrentNodeIdByHistory(nodeId))
  }
  const onChangeNextHistory = () => {
    const nodeId = history[index + 1]
    dispatch(changeCurrentNodeIdByHistory(nodeId))
  }

  return (
    <>
      <span onClick={onChangePrevHistory} className={`icon ${isMoveablePrevNode(history, index) ? "left-arrow-active" : "left-arrow"}`}></span>
      <span onClick={onChangeNextHistory} className={`icon ${isMoveableNextNode(history, index) ? "right-arrow-active" : "right-arrow"}`}></span>
    </>
  )
}

export default HistoryContainer

import { useCallback, useState, memo } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { CLOSE_SIDE_NODE_TEST_ID, OPEN_SIDE_NODE_TEST_ID, SIDE_NODE_TEST_ID } from "../constants/test"
import { useChangeNodeId } from "../hooks"
import { useAppSelector } from "../store/hooks"
import { changeCurrentNodeId, hideSideBarNode, rootNodeId, showSideBarNode } from "../store/reducer"
import { selectDirChildrenById, selectNodeById, selectSideBarNodeById } from "../store/selector/selector"

const SideBarContainer = function () {
  return (
    <div className="tree-container">
      <MemoizedRecursiveTreeContainer nodeId={rootNodeId} level={1} />
    </div>
  )
}
export default SideBarContainer

const MemoizedRecursiveTreeContainer = memo(function RecursiveTreeContainer({ nodeId, level }: any) {
  const dispatch = useDispatch()

  const node = useAppSelector(state => selectNodeById(state, nodeId))
  const sideBarNode = useAppSelector(state => selectSideBarNodeById(state, nodeId))
  const dirChilden = useAppSelector(state => selectDirChildrenById(state, nodeId), shallowEqual)

  const marginLeft = level * 10
  const { name, children } = node

  const onChangeNodeId = useCallback((): void => {
    dispatch(changeCurrentNodeId(nodeId))
  }, [nodeId])

  const show = useCallback(() => {
    dispatch(showSideBarNode(nodeId))
  }, [nodeId])

  const hide = useCallback(() => {
    dispatch(hideSideBarNode(nodeId))
  }, [nodeId])

  if (!sideBarNode) return null
  const { showChildren, selected } = sideBarNode
  return (
    <>
      <div data-testid={SIDE_NODE_TEST_ID} style={{ backgroundColor: selected ? "darkgray" : "inherit" }}>
        <div style={{ marginLeft: marginLeft }}>
          {showChildren === true && (
            <button data-testid={CLOSE_SIDE_NODE_TEST_ID} onClick={hide}>
              {" / "}
            </button>
          )}
          {showChildren === false && (
            <button data-testid={OPEN_SIDE_NODE_TEST_ID} onClick={show}>
              {" > "}
            </button>
          )}

          <span onClick={onChangeNodeId}>{name}</span>
        </div>
      </div>
      {dirChilden ? (
        <div style={{ display: showChildren ? "block" : "none" }}>
          {dirChilden.map(child => (
            <MemoizedRecursiveTreeContainer key={child.id} nodeId={child.id} level={level + 1} />
          ))}
        </div>
      ) : null}
    </>
  )
})

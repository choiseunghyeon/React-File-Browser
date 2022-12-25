import { useCallback, useState, memo } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { CLOSE_SIDE_NODE_TEST_ID, OPEN_SIDE_NODE_TEST_ID, SIDE_NODE_TEST_ID } from "../constants/test"
import { useChangeNodeId } from "../hooks"
import { useAppSelector } from "../store/hooks"
import { changeCurrentNodeId, hideSideBarNode, rootNodeId, showSideBarNode } from "../store/reducer"
import { IComponentSideBarNode, selectDirChildrenById, selectNodeById, selectSideBarNodeById } from "../store/selector/selector"
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io"

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

  const { name, showChildren, selected, sideNodeIds } = useAppSelector(state => selectSideBarNodeById(state, nodeId), shallowEqual)

  const marginLeft = level * 10

  const onChangeNodeId = useCallback((): void => {
    dispatch(changeCurrentNodeId(nodeId))
  }, [nodeId])

  const show = useCallback(() => {
    dispatch(showSideBarNode(nodeId))
  }, [nodeId])

  const hide = useCallback(() => {
    dispatch(hideSideBarNode(nodeId))
  }, [nodeId])

  return (
    <>
      <div data-testid={SIDE_NODE_TEST_ID} style={{ backgroundColor: selected ? "darkgray" : "inherit" }}>
        <div style={{ marginLeft: marginLeft }}>
          {showChildren === true && <IoIosArrowDown data-testid={CLOSE_SIDE_NODE_TEST_ID} onClick={hide} />}
          {showChildren === false && <IoIosArrowForward data-testid={OPEN_SIDE_NODE_TEST_ID} onClick={show} />}
          {showChildren === null && <IoIosArrowForward style={{ opacity: 0 }} />}
          <span onClick={onChangeNodeId}>{name}</span>
        </div>
      </div>
      {showChildren === true && sideNodeIds ? (
        <div style={{ display: showChildren ? "block" : "none" }}>
          {sideNodeIds.map(nodeId => (
            <MemoizedRecursiveTreeContainer key={nodeId} nodeId={nodeId} level={level + 1} />
          ))}
        </div>
      ) : null}
    </>
  )
})

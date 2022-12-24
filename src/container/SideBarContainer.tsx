import { useCallback, useState, memo } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { CLOSE_SIDE_NODE_TEST_ID, OPEN_SIDE_NODE_TEST_ID, SIDE_NODE_TEST_ID } from "../constants/test"
import { useChangeNodeId } from "../hooks"
import { useAppSelector } from "../store/hooks"
import { changeCurrentNodeId, rootNodeId, toggleSideBarNode } from "../store/root"
import { selectChildrenById, selectCurrentNodeId, selectDirChildrenById, selectNodeById, selectSideBarNodeById } from "../store/selector/selector"

const SideBarContainer = function () {
  return (
    <div className="tree-container" onClick={() => console.log("bubble!")}>
      <MemoizedRecursiveTreeContainer nodeId={rootNodeId} level={1} />
    </div>
  )
}
export default SideBarContainer

const MemoizedRecursiveTreeContainer = memo(function RecursiveTreeContainer({ nodeId, level }: any) {
  const dispatch = useDispatch()

  const node = useAppSelector(state => selectNodeById(state, nodeId))
  const { showChildren, selected } = useAppSelector(state => selectSideBarNodeById(state, nodeId))
  const dirChilden = useAppSelector(state => selectDirChildrenById(state, nodeId), shallowEqual)

  const marginLeft = level * 10
  const { name, children } = node

  const onChangeNodeId = useCallback((): void => {
    dispatch(changeCurrentNodeId(nodeId))
  }, [nodeId])

  const toggleShowChildren = useCallback(() => {
    dispatch(toggleSideBarNode(nodeId))
  }, [nodeId])

  return (
    <>
      <div data-testid={SIDE_NODE_TEST_ID} style={{ backgroundColor: selected ? "darkgray" : "inherit" }}>
        <div style={{ marginLeft: marginLeft }}>
          {dirChilden &&
            (showChildren ? (
              <button data-testid={CLOSE_SIDE_NODE_TEST_ID} onClick={toggleShowChildren}>
                {" / "}
              </button>
            ) : (
              <button data-testid={OPEN_SIDE_NODE_TEST_ID} onClick={toggleShowChildren}>
                {" > "}
              </button>
            ))}
          <span onClick={onChangeNodeId}>{name}</span>
        </div>
      </div>
      {dirChilden ? (
        <div style={{ opacity: showChildren ? 1 : 0 }}>
          {dirChilden.map(child => (
            <MemoizedRecursiveTreeContainer key={child.id} nodeId={child.id} level={level + 1} />
          ))}
        </div>
      ) : null}
    </>
  )
})

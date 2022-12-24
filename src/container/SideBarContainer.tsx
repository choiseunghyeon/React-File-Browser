import { useCallback, useState, memo } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
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
  const { showChildren } = useAppSelector(state => selectSideBarNodeById(state, nodeId))
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
      <div>
        <div style={{ marginLeft: marginLeft }}>
          {dirChilden ? showChildren ? <button onClick={toggleShowChildren}>{" / "}</button> : <button onClick={toggleShowChildren}>{" > "}</button> : null}
          <span onClick={onChangeNodeId}>{name}</span>
        </div>
      </div>
      {children ? (
        <div style={{ opacity: showChildren ? 1 : 0 }}>
          {children.map(nodeId => (
            <MemoizedRecursiveTreeContainer key={nodeId} nodeId={nodeId} level={level + 1} />
          ))}
        </div>
      ) : null}
    </>
  )
})

import React, { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import Item from "../components/Item"
import { useAppSelector } from "../store/hooks"
import { changeCurrentNodeId } from "../store/root"
import { selectChildrenById, selectCurrentNodeId } from "../store/selector/selector"

// interface IMainBodyContainerProps {
//     currentNode: IRenderTree;
//     updateChildren: Function;
//     changeCurrentNodeId: Function;
//     updateNodeHistory: Function;
// }

export const MainBodyContainer = function () {
  const dispatch = useDispatch()
  const currentNodeId = useAppSelector(selectCurrentNodeId)
  const children = useAppSelector(state => selectChildrenById(state, currentNodeId))
  const onChangeNodeId = useCallback((nodeId: string): void => {
    dispatch(changeCurrentNodeId(nodeId))
  }, [])
  if (!children) return null
  // const [selectedNodeId, setSelectedNodeId] = useState('');

  // const changeSelectedNodeId = useCallback((event) => {
  //     setSelectedNodeId(event.target.id);
  // }, []);

  // const handleDblClick = async () => {
  //     const selectedNode = getNodeInTree(currentNode, selectedNodeId);
  //     if (!isDirectory(selectedNode)) return;

  //     updateChildren(selectedNode);
  //     changeCurrentNodeId(selectedNode.id);
  //     updateNodeHistory(selectedNode.id);
  // }

  //   if (!currentNode.children) return null
  return (
    <div className="body">
      {children.map(node => (
        <Item key={node.id} node={node} onChangeNodeId={onChangeNodeId} />
      ))}
    </div>
  )
}

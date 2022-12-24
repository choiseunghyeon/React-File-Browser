import MainHeaderContainer from "./MainHeaderContainer"
import { MainBodyContainer } from "./MainBodyContainer"
import { useSelector } from "react-redux"
import { selectChildrenById, selectCurrentNodeId } from "../store/selector/selector"
import { useAppSelector } from "../store/hooks"

export function MainContainer() {
  // const {tree, currentNodeId} = useSelector( (state: RootState) => ({
  //     tree: state.treeState.tree,
  //     currentNodeId: state.treeState.currentNodeId,
  // }), shallowEqual);
  // const currentNode = useMemo(() => getNodeInTree(tree, currentNodeId), [tree, currentNodeId]);
  // const { changeCurrentNodeId, updateNodeHistory, updateChildren} = useDefaultTreeDispatch();

  // const { show } = useContextMenu({
  //     id: MENU_ID,
  // });
  // const displayLayer = useCallback((e) => {
  //     show(e, {
  //         props: {
  //             layerId: MAIN_CONTAINER_LAYER_ID,
  //             node: currentNode
  //         }
  //     })
  // }, [currentNode]);

  return (
    <div className="main-container">
      <MainHeaderContainer />
      <MainBodyContainer />
      {/* 테스트용 임시 빈 공간 추후 삭제 예정 */}
    </div>
  )
}

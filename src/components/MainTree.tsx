import { useEffect } from "react"
import { useAppSelector } from "../store/hooks"
import { selectNodeById } from "../store/selector/selector"

// interface IMainTreeProps {
//   tree: IRenderTree;
//   updateChildren: Function;
//   updateNodeHistory: Function;
//   currentNodeId: string;
//   changeCurrentNodeId: Function;
// }

// export default function MainTree({tree, updateChildren, changeCurrentNodeId, currentNodeId, updateNodeHistory}: IMainTreeProps) {
//   // const classes = useStyles();
//   // useEffect(() => {
//   //   async function getDirectory () {
//   //     // 초기 store 설정 시 api 요청해서 기본 값으로 가지고 있도록 옮기기
//   //     updateChildren(tree);
//   //     changeCurrentNodeId(tree.id);
//   //     updateNodeHistory(tree.id);
//   //   }
//   //   getDirectory();
//   // }, []) // only mounted

//   return (
//     <TreeView
//       className={classes.root}
//       defaultCollapseIcon={<ExpandMoreIcon />}
//       defaultExpandIcon={<ChevronRightIcon />}
//       selected={currentNodeId}
//     >
//       <RecursiveTree node={tree} updateChildren={updateChildren} changeSelectedNodeId={changeCurrentNodeId}/>
//     </TreeView>
//   );
// }

// interface IRecursiveTree {
//   node: IRenderTree;
//   changeSelectedNodeId: Function;
//   updateChildren: Function;
// }

// export default function RecursiveTreeContainer({ id, level }: any) {
//   const node = useAppSelector(state => selectNodeById(state, id))
//   const marginLeft = level * 10
//   const { id, name, children } = node

//   // if (!isDirectory(node)) return null;

//   // const getDirectoryList = async (e) => {
//   //   // 나중에 분리 mouseover, dblclick? 등
//   //   if (typeof children === "undefined") {
//   //     updateChildren(node);
//   //   }

//   //   changeSelectedNodeId(id);
//   //   // e.preventDefault(); // 하위 트리 확장 막기
//   // }

//   return (
//     <>
//       <div style={{ marginLeft: marginLeft }}>{name}</div>
//       {children ? children.map(node => <RecursiveTreeContainer node={node} level={level + 1} />) : null}
//     </>
//     // <StyledTreeItem  data-testid={treeValue} key={id} nodeId={id} label={name} onLabelClick={getDirectoryList}>
//     // </StyledTreeItem>
//   )
// }

// const StyledTreeItem = withStyles((theme: Theme) =>
//   createStyles({
//     iconContainer: {
//       '& .close': {
//         opacity: 0.3,
//       },
//     },
//     group: {
//       marginLeft: 7,
//       paddingLeft: 18,
//       borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
//     },
//   }),
// )((props: TreeItemProps) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

// function TransitionComponent(props: TransitionProps) {
//   const style = useSpring({
//     from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
//     to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
//   });

//   return (
//     <animated.div style={style}>
//       <Collapse {...props} />
//     </animated.div>
//   );
// }

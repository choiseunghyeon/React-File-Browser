import { createAction, createReducer } from "@reduxjs/toolkit"
import { state } from "./tempState"

export interface IState {
  // path: string
  currentNodeId: string
  sideBarMap: {
    [id: NodeId]: ISideBarNode
  }
  flatMap: IFlatMap
}

export interface IFlatMap {
  [id: NodeId]: INode
}
export interface ISideBarMap {
  [id: NodeId]: ISideBarNode
}
export interface ISideBarNode {
  id: NodeId
  showChildren: boolean
}
export type NodeId = string
export type NodeType = "dir" | "file"
export interface INode {
  id: NodeId
  name: string
  type: NodeType
  parentId: string | null
  children: NodeId[] | null
}

export const rootNodeId = "1"

const root: IState = state
// interface IPorfolioPayload {
//   portfolioPageType: PortfolioPageType
//   portfolio: any // server response
// }

// export const removeBlock = createAction<IRemoveBlockPayload>("setup/removeBlock")
export const changeCurrentNodeId = createAction<NodeId>("node/changeCurrentNodeId")
export const toggleSideBarNode = createAction<NodeId>("node/toggleSideBarNode")
// layout
const rootReducer = createReducer(root, builder => {
  builder
    .addCase(changeCurrentNodeId, (state, action) => {
      const nodeId = action.payload
      state.currentNodeId = nodeId
    })
    .addCase(toggleSideBarNode, (state, action) => {
      const nodeId = action.payload
      state.sideBarMap[nodeId].showChildren = !state.sideBarMap[nodeId].showChildren
    })
  // builder
  //   .addCase(changePortfolioById, (state, action) => {
  //     const { portfolioPageType, portfolio } = action.payload
  //     let baselinePortfolio
  //     if (!portfolio) {
  //       baselinePortfolio = defaultPortfolioData
  //     } else {
  //       baselinePortfolio = {
  //         id: portfolio.id,
  //         blockLayout: createDefaultBlockLayout(portfolio.blockLayout),
  //         blockTypeStyle: portfolio.blockTypeStyle || defaultBlockTypeStyle,
  //         blocks: portfolio.blocks.map(block => createBlock({ id: block.id, idx: block.idx, blockType: block.blockType, fieldValues: block.fieldValues })),
  //       }
  //     }
  //     console.log(baselinePortfolio)
  //     state.portfolio["baseline"] = baselinePortfolio
  //     state.portfolio[portfolioPageType] = baselinePortfolio
  //     const profileBlock = baselinePortfolio.blocks.find(block => block.type === "Profile")
  //     if (!profileBlock) return
  //     const additionalField = profileBlock.fields.find(field => field.title === "(선택) 추가 정보")
  //     if (!additionalField) return
  //     setSelectItemValue(profileBlock, additionalField, additionalField.value.selectedValue)
  //   })
})

export default rootReducer

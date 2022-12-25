import { IState } from "./reducer"

export const state: IState = {
  // path: "C:/",
  currentNodeId: "2",
  sideBarMap: {
    root: {
      id: "root",
      showChildren: true,
    },
    "2": {
      id: "2",
      showChildren: true,
      selected: true,
    },
    "3": {
      id: "3",
      showChildren: false,
    },
  },
  flatMap: {
    root: {
      id: "root",
      name: "C:",
      type: "dir",
      parentId: null,
      children: ["2"],
    },
    "2": {
      id: "2",
      name: "새폴더",
      type: "dir",
      parentId: "root",
      children: ["3"],
    },
    "3": {
      id: "3",
      name: "새폴더2",
      type: "dir",
      parentId: "2",
      children: ["4"],
    },
    "4": {
      id: "4",
      name: "index.ts",
      type: "file",
      parentId: "3",
      children: null,
    },
  },
}

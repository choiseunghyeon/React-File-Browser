import { createAction } from "@reduxjs/toolkit"
import { call, put, select, takeLatest } from "redux-saga/effects"
import api from "../../api/fileBrowser"
import { ActionType, changeCurrentNodeId, showError, updateNodes, updateSideNodes } from "../action"
import { IFlatMap } from "../reducer"
import { selectFlatMap } from "../selector/selector"
import { createNodeFromFile, getAbsolutePathIn, getChilrenDirNodeList } from "../utils"
const INIT_FILES_FETCH_REQUESTED = "node/FILES_FETCH_REQUESTED"
const FILES_FETCH_REQUESTED = "node/FILES_FETCH_REQUESTED"
const FILES_FETCH_SUCCEEDED = "FILES_FETCH_SUCCEEDED"
const FILES_FETCH_FAILED = "FILES_FETCH_FAILED"

interface IFetchFilesPayload {
  path: string
  parentId: string | null
  type?: "all" | "dir" | "file"
}

export const initFetchFiles = createAction(INIT_FILES_FETCH_REQUESTED)
export const fetchFiles = createAction<IFetchFilesPayload>(FILES_FETCH_REQUESTED)
export const failFetchFiles = createAction<IFetchFilesPayload>(FILES_FETCH_FAILED)
function* initFetchFilesSaga() {
  const path = "C:/BUIS_HOME"
  const parentId = "root"
  try {
    const files = yield call(api.getFiles, path, "all")
    const nodes = files.map(dir => createNodeFromFile(dir, parentId))
    yield put(updateNodes({ nodes, parentId }))
    yield put(changeCurrentNodeId("root"))
  } catch (e: any) {
    yield put(showError(e.message))
  }
}

function* fetchFilesSaga(action) {
  const { path, type, parentId } = action.payload
  try {
    const files = yield call(api.getFiles, path, type)
    const nodes = files.map(dir => createNodeFromFile(dir, parentId))
    yield put(updateNodes({ nodes, parentId }))
  } catch (e: any) {
    yield put(showError(e.message))
  }
}

// api 관련 요청 필요한 경우 판단에 필요한 값들을 서버에서 전달받아 사용해야 할듯
function* fetchDirsSaga(action) {
  const nodeId = action.payload
  const flatMap: IFlatMap = yield select(selectFlatMap)
  const path = getAbsolutePathIn(flatMap, nodeId)

  let dirNodes = getChilrenDirNodeList(flatMap, nodeId)

  try {
    if (!dirNodes) {
      const dirs = yield call(api.getFiles, path, "dir")
      if (!dirs) return
      dirNodes = dirs.map(dir => createNodeFromFile(dir, nodeId))
      if (!dirNodes) return
      yield put(updateNodes({ nodes: dirNodes, parentId: nodeId }))
    }

    const dirsWithHasChildren = yield call(api.getChildrenDirsWithHasChildren, path)
    const sideNodes = dirNodes.map(node => {
      const dirHasChildren = dirsWithHasChildren.find(dir => dir.name === node.name)
      const showChildren = dirHasChildren ? false : null
      return {
        id: node.id,
        showChildren,
      }
    })
    yield put(updateSideNodes(sideNodes))
  } catch (e: any) {
    yield put(showError(e.message))
  }
}

function* fetchFilesByNodeIdSaga(action) {
  const nodeId = action.payload
  const flatMap: IFlatMap = yield select(selectFlatMap)
  const node = flatMap[nodeId]
  const path = getAbsolutePathIn(flatMap, nodeId)

  try {
    // dir, file 둘다 필요한지 file만 필요한지 판별
    // children 요청 안한 경우
    if (!node.children) {
      const files = yield call(api.getFiles, path, "all")
      const nodes = files.map(dir => createNodeFromFile(dir, nodeId))

      yield put(updateNodes({ nodes, parentId: nodeId }))
      return
    }

    const dirs = getChilrenDirNodeList(flatMap, nodeId)
    // file만 있는 경우
    if (!dirs) return
    // directory만 먼저 가져온 경우
    if (dirs.length === node.children.length) {
      const files = yield call(api.getFiles, path, "file")
      const nodes = files.map(dir => createNodeFromFile(dir, nodeId))
      yield put(updateNodes({ nodes, parentId: nodeId }))
      return
    }
  } catch (e: any) {
    yield put(showError(e.message))
  }
}

function* apiSaga() {
  yield takeLatest(INIT_FILES_FETCH_REQUESTED, initFetchFilesSaga)
  yield takeLatest(FILES_FETCH_REQUESTED, fetchFilesSaga)
  yield takeLatest(ActionType.CHANGE_CURRENT_NODE_ID, fetchFilesByNodeIdSaga)
  yield takeLatest(ActionType.SHOW_SIDE_BAR_NODE, fetchDirsSaga)
}

export default apiSaga

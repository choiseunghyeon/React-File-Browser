import { createAction } from "@reduxjs/toolkit"
import { call, put, select, takeLatest } from "redux-saga/effects"
import api from "../../api/fileBrowser"
import { changeCurrentNodeId, IFlatMap, showError, updateNodes, updateNodesFromFiles, updateSideNodes } from "../reducer"
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
  try {
    const files = yield call(api.getFiles, path, "all")
    yield put(updateNodesFromFiles({ files, parentId: "root" }))
    yield put(changeCurrentNodeId("root"))
  } catch (e: any) {
    yield put(showError(e.message))
  }
}

function* fetchFilesSaga(action) {
  const { path, type, parentId } = action.payload
  try {
    const files = yield call(api.getFiles, path, type)
    yield put(updateNodesFromFiles({ files, parentId }))
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
    if (!node.children) {
      // files 요청
      const files = yield call(api.getFiles, path, "all")
      yield put(updateNodesFromFiles({ files, parentId: nodeId }))
    } else {
      // directory만 있는 경우 file만 따로 요청
      // 단, server에서 directory만 가지고 있는 경우도 있을 수 있음.. 나중에 고민
      // file 따로 요청
      const dirNodes = getChilrenDirNodeList(flatMap, nodeId)
      if (!dirNodes) return
      if (dirNodes.length !== node.children.length) return

      const files = yield call(api.getFiles, path, "file")
      yield put(updateNodesFromFiles({ files, parentId: nodeId }))
    }
  } catch (e: any) {
    yield put(showError(e.message))
  }
}

function* apiSaga() {
  yield takeLatest(INIT_FILES_FETCH_REQUESTED, initFetchFilesSaga)
  yield takeLatest(FILES_FETCH_REQUESTED, fetchFilesSaga)
  yield takeLatest("node/changeCurrentNodeId", fetchFilesByNodeIdSaga)
  yield takeLatest("node/showSideBarNode", fetchDirsSaga)
}

export default apiSaga

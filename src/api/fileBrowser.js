import http from "./http"

const HEADERS = {
  "Content-Type": "application/json",
}

const BASE_URL = "http://localhost:5000"

export const deleteFile = filePath => {
  const URL = `${BASE_URL}/file`
  return http.delete(
    URL,
    {
      path: filePath,
    },
    HEADERS
  )
}

export const deleteFolder = folderPath => {
  const URL = `${BASE_URL}/folder`
  return http.delete(
    URL,
    {
      path: folderPath,
    },
    HEADERS
  )
}

export const getFiles = (path, type = "all") => {
  // type = "all" | "dir" | "file"
  const URL = `${BASE_URL}/files?path=${path}&type=${type}`
  return http.get(URL, {})
}

export const getChildrenDirsWithHasChildren = path => {
  const URL = `${BASE_URL}/dirs/hasChildren?path=${path}`
  return http.get(URL, {})
}

export const pasteNode = req => {
  const URL = `${BASE_URL}/paste`
  return http.post(URL, req, HEADERS)
}

export default { getFiles, getChildrenDirsWithHasChildren, pasteNode, deleteFolder, deleteFile }

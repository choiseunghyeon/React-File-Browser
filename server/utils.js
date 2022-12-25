const fs = require("fs")

function createFile(name) {
  return {
    type: "file",
    name,
  }
}

function createDirectory(name) {
  return {
    type: "dir",
    name,
  }
}

function createDirectoryWithChildrenFlag(name, hasChildren) {
  return {
    type: "dir",
    name,
    hasChildren,
  }
}

function makeDestinationPath(destPath, name) {
  let finalPath = `${destPath}/${name}`
  if (fs.existsSync(finalPath)) {
    let candidatePath = [finalPath, " - 복사본 ", 1]
    while (fs.existsSync(candidatePath.join(""))) {
      candidatePath[2]++
    }

    finalPath = candidatePath.join("")
  }

  return finalPath
}

function getAllFile(path) {
  const files = getFiles(path)
  return files.map(file => (file.isDirectory() ? createDirectory(file.name) : createFile(file.name)))
}

function getDirs(path) {
  const files = getFiles(path)
  const dirs = files.filter(file => file.isDirectory())
  return dirs.map(file => createDirectory(file.name))
}

function getFilesWithoutDir(path) {
  const files = getFiles(path)
  const filesWithoutDir = files.filter(file => !file.isDirectory())
  return filesWithoutDir.map(file => createFile(file.name))
}

function getFiles(path) {
  const list = fs.readdirSync(path, { withFileTypes: true })
  return list
}

module.exports = {
  createFile,
  createDirectory,
  makeDestinationPath,
  getAllFile,
  getDirs,
  getFilesWithoutDir,
}

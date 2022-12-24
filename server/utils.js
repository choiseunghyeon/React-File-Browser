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
  const list = fs.readdirSync(path, { withFileTypes: true })
  console.log(list)
  const dirList = list.reduce((arr, filePath) => {
    filePath.isDirectory() ? arr.push(createDirectory(filePath.name)) : arr.push(createFile(filePath.name))
    return arr
  }, [])

  return dirList
}

module.exports = {
  createFile,
  createDirectory,
  makeDestinationPath,
  getAllFile,
}

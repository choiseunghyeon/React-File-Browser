var express = require("express")
const fs = require("fs")
const fsExtra = require("fs-extra")
const cors = require("cors")

const { makeDestinationPath, getAllFile, getFilesWithoutDir, getDirs } = require("./utils")
var app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

app.get("/files", function (req, res) {
  const { path, type } = req.query
  let result
  if (type === "file") {
    result = getFilesWithoutDir(path)
  } else if (type === "dir") {
    result = getDirs(path)
  } else {
    result = getAllFile(path)
  }

  res.json(result)
})

app.get("/dirs/hasChildren", function (req, res) {
  // path 하위 children들이 children을 가지고 있는지 확인
  const { path } = req.query
  const dirs = getDirs(path)
  const result = dirs.reduce((acc, dir) => {
    const newPath = path + "/" + dir.name
    const result = getDirs(newPath)
    if (result.length > 0) acc.push({ ...dir, hasChildren: true })
    return acc
  }, [])

  return res.json(result)
})

app.delete("/file", function (req, res) {
  const path = req.body.path
  console.log(req.body)

  try {
    fs.unlinkSync(path)
  } catch (error) {
    res.json("삭제 과정에 문제가 있었습니다.")
  }

  res.json("성공적으로 삭제되었습니다.")
})

app.delete("/folder", function (req, res) {
  const path = req.body.path
  console.log(req.body)

  try {
    fs.rmdirSync(path, { recursive: true })
  } catch (error) {
    res.json("삭제 과정에 문제가 있었습니다.")
  }

  res.json("성공적으로 삭제되었습니다.")
})

app.post("/paste", function (req, res) {
  const { type, path, name, destPath } = req.body
  console.log(req.body)
  const finalPath = makeDestinationPath(destPath, name)
  // console.log(finalPath);
  fsExtra.copy(path, finalPath, function (err) {
    console.log(err)
    if (err) {
      res.json("복사 과정에 문제가 있었습니다.")
    }

    // res.json("정상적으로 복사되었습니다.");
    const allFileList = getAllFile(destPath)
    res.json(allFileList)
  })
})

app.listen(5000, function () {
  console.log("Example app listening on port 5000!")
})

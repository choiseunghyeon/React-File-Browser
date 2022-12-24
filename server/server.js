var express = require("express");
const fs = require("fs");
const fsExtra = require("fs-extra");
const cors = require("cors");

const { makeDestinationPath, getAllFile } = require("./utils");
var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/dir", function (req, res) {
  const path = req.query.path;

  const list = fs.readdirSync(path, { withFileTypes: true });
  const dirList = list.reduce((arr, filePath) => {
    console.dir(filePath);
    if (filePath.isDirectory()) {
      arr.push(filePath);
    }
    return arr;
  }, []);

  res.json(dirList);
});

app.get("/all", function (req, res) {
  const path = req.query.path;

  const result = getAllFile(path);

  res.json(result);
});

app.delete("/file", function (req, res) {
  const path = req.body.path;
  console.log(req.body);

  try {
    fs.unlinkSync(path);
  } catch (error) {
    res.json("삭제 과정에 문제가 있었습니다.");
  }

  res.json("성공적으로 삭제되었습니다.");
});

app.delete("/folder", function (req, res) {
  const path = req.body.path;
  console.log(req.body);

  try {
    fs.rmdirSync(path, { recursive: true });
  } catch (error) {
    res.json("삭제 과정에 문제가 있었습니다.");
  }

  res.json("성공적으로 삭제되었습니다.");
});

app.post("/paste", function (req, res) {
  const { type, path, name, destPath } = req.body;
  console.log(req.body);
  const finalPath = makeDestinationPath(destPath, name);
  // console.log(finalPath);
  fsExtra.copy(path, finalPath, function (err) {
    console.log(err);
    if (err) {
      res.json("복사 과정에 문제가 있었습니다.");
    }

    // res.json("정상적으로 복사되었습니다.");
    const allFileList = getAllFile(destPath);
    res.json(allFileList);
  });
});

app.listen(5000, function () {
  console.log("Example app listening on port 5000!");
});

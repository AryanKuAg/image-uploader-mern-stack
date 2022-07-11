const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/images')
      },
    filename: function (req, file, cb) {

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileName = file.originalname.replaceAll(' ','')
      cb(null, fileName)
    }
  })
  

const upload = multer({
//   dest: "images/",
  storage,
  limits: {
    fileSize: 10000000,
  },
  
  fileFilter(res, file, cb) {
    if (
      !file.originalname.endsWith(".jpg") &&
      !file.originalname.endsWith(".jpeg") &&
      !file.originalname.endsWith(".png")
    ) {
      return cb(new Error("Please upload an Image!"));
    }
    cb(undefined, true);
  },
  
});


router.post("/upload", upload.single("picture"), (req, res) => {
  const filename = req?.file.filename;
  res.status(200).send(req.headers.host+"/images/" + filename);
});

router.get("/images/:image", (req, res) => {
  res.sendFile(path.join(__dirname, "images", req.params.image));
});

module.exports = router;

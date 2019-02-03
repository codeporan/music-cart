const cloudinary = require("cloudinary");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const { Product } = require("../models/product");
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

exports.upload = multer(multerOptions).single("photo");
exports.resize = async (req, res, next) => {
  //check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }

  const extension = req.file.mimetype.split("/")[1];
  req.body.images = `${uuid.v4()}.${extension}`;
  // now we are resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.images}`);
  next();
};

exports.getUploadFiles = async (req, res) => {
  const dir = path.resolve(".") + "/public/uploads/";
  let items = await fs.readdir(dir);
  res.status(200).send(items);
};

exports.getDownloadfile = (req, res) => {
  const file = path.resolve(".") + `/public/uploads/${req.params.id}`;
  res.download(file);
};

// with admin product file upload

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

exports.UploadImage = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.files.file.path);
  console.log(result);
  res.status(200).send({
    public_id: result.public_id,
    url: result.url
  });
  if (result) {
    public_id: `${Date.now()}`;
    resource_type: "auto";
  }
};

exports.removeimage = async (req, res) => {
  let image_id = req.query.public_id;
  await cloudinary.uploader.destory(image_id);
  res.status(200).send("ok");
};

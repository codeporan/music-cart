const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const { catchErrors } = require("../handlers/errorHandlers");
const userController = require("../controller/userController");
const brandController = require("../controller/brandController");
const woodController = require("../controller/woodController");
const productController = require("../controller/productController");
const cartController = require("../controller/cartController");
const fileUploaderController = require("../controller/fileuploadController");
const { auth } = require("../middlware/auth");
const admin = require("../middlware/admin");
router.post("/api/v1/users/register", catchErrors(userController.Register));
router.post("/api/v1/users/login", catchErrors(userController.Login));
router.get("/api/v1/users", auth, catchErrors(userController.User));
router.get("/api/v1/users/logout", auth, catchErrors(userController.Logout));

//brand
router.post("/api/v1/product/brand", auth, admin, brandController.Addbrand);
router.get("/api/v1/product/brands", brandController.getBrand);

//wood
router.post("/api/v1/product/wood", auth, admin, woodController.Addwood);
router.get("/api/v1/product/woods", woodController.getWood);

//product
router.post(
  "/api/v1/product/addproduct",
  auth,
  admin,
  productController.AddProduct
);
router.get(
  "/api/v1/product/articles",
  productController.getProductbySortbyarticle
);

router.get(
  "/api/v1/product/articles_by_id",
  productController.getProductArticleByid
);
router.post("/api/v1/product/shop", productController.ProducToShop);

//image uploader file 1st  way
// router.post(
//   "/api/v1/uploadimage",
//   auth,
//   admin,
//   formidable(),
//   catchErrors(fileUploaderController.UploadImage)
// );
// router.get(
//   "/api/v1/removeimage",
//   auth,
//   admin,
//   fileUploaderController.removeimage
// );
// //image uploader file 2nd way
// router.post(
//   "/api/v1/uploadfile",
//   auth,
//   admin,
//   fileUploaderController.upload,
//   catchErrors(fileUploaderController.resize)
// );
// router.get(
//   "/api/v1/adminfile",
//   auth,
//   admin,
//   catchErrors(fileUploaderController.getUploadFiles)
// );
// router.get("/api/v1/download/:id", fileUploaderController.getDownloadfile);

//cart
router.post(
  "/api/v1/users/addToCart",
  auth,
  catchErrors(cartController.AddCart)
);
router.get(
  "/api/v1/users/removeFromCart",
  auth,
  cartController.removeProductCart
);
router.post("/api/v1/users/successbuy", auth, cartController.onSuccessBuy);
module.exports = router;

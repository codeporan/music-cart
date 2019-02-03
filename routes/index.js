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
router.post("/api/users/register", catchErrors(userController.Register));
router.post("/api/users/login", catchErrors(userController.Login));
router.get("/api/users", auth, catchErrors(userController.User));
// router.post(
//   "/api/resetpassword",
//   auth,
//   catchErrors(userController.ResetPassword)
// );
// router.post(
//   "/api/confirmpassword",
//   auth,
//   catchErrors(userController.confirmPassword)
// );
router.get("/api/users/logout", auth, catchErrors(userController.Logout));

//brand
router.post("/api/product/brand", auth, admin, brandController.Addbrand);
router.post("/api/product/brand/:id", brandController.updateBrand);
router.get("/api/product/brands", brandController.getBrand);
router.get("/api/product/brand/:id", brandController.getBrandbyId);
router.delete(
  "/api/product/brand/:id",
  auth,
  admin,
  brandController.deleteBrand
);

//wood
router.post("/api/product/wood", auth, admin, woodController.Addwood);
router.post("/api/product/wood/:id", auth, admin, woodController.updateWood);
router.get("/api/product/woods", woodController.getWood);
router.get("/api/product/wood/:id", woodController.getWoodbyId);
router.delete("/api/product/wood/:id", auth, admin, woodController.deleteWood);

//product
router.post(
  "/api/product/addproduct",
  auth,
  admin,
  productController.AddProduct
);
// router.put("/api/product/updateproduct", productController.UpdateProduct);
router.get(
  "/api/product/articles",
  productController.getProductbySortbyarticle
);

router.get(
  "/api/product/articles_by_id",
  productController.getProductArticleByid
);
router.post("/api/product/shop", productController.ProducToShop);

router.get("/api/productlist", catchErrors(productController.brandbyProduct));
// router.get(
//   "/api/productlist/:id",
//   catchErrors(productController.brandbyProduct)
// );

router.get("/api/product/singleproduct/:id", productController.productByid);
router.delete(
  "/api/product/deleteproduct/:id",
  auth,
  admin,
  productController.deleteProduct
);

//image uploader file 1st  way
router.post(
  "/api/v1/uploadimage",
  auth,
  admin,
  formidable(),
  catchErrors(fileUploaderController.UploadImage)
);
router.get(
  "/api/v1/removeimage",
  auth,
  admin,
  fileUploaderController.removeimage
);
//image uploader file 2nd way
router.post(
  "/api/v1/uploadfile",
  auth,
  admin,
  fileUploaderController.upload,
  catchErrors(fileUploaderController.resize)
);
router.get(
  "/api/v1/adminfile",
  auth,
  admin,
  catchErrors(fileUploaderController.getUploadFiles)
);
router.get("/api/v1/download/:id", fileUploaderController.getDownloadfile);

//cart
router.post("/api/users/addToCart", auth, catchErrors(cartController.AddCart));
router.get("/api/users/removeFromCart", auth, cartController.removeProductCart);
router.post("/api/users/successbuy", auth, cartController.onSuccessBuy);
module.exports = router;

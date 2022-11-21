import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CardHeader from "@mui/material/CardHeader";
import {
  ArrowCircleLeftRounded,
  ArrowCircleRightRounded,
} from "@mui/icons-material";
import CustomBtnOutline from "./customBtnOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CustomText } from "./CustomText";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CartCounterContext } from "./cartCounter";

export default function ProductCard(props) {
  const [open, setOpen] = useState(false);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const { currentCount, setCurrentCount } = useContext(CartCounterContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShow = (image) => {
    console.log("came here in child");
    console.log("This is the image in child", image);
    // setToShowImage(image);
    // $("#imageModal").modal("show");
    props.handleSetToShowImage(image);
  };

  const handleAddToCart = (product) => {
    setSnackMessage("item added to cart");
    setOpenSnack(true);
    var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    var exists = false;
    var totalItems = 0;
    cartItems.forEach(function (item, index) {
      if (item.id === props.productId) {
        item.quantity = item.quantity + 1;
        item.totalCost = item.quantity * item.newPrice;
        exists = true;
      }
      totalItems = totalItems + item.quantity;
    });
    if (!exists) {
      var item = {
        id: props.productId,
        name: product.productName,
        image: product.image,
        newPrice: product.newPrice,
        oldPrice: product.oldPrice,
        quantity: 1,
        totalCost: 1 * parseInt(product.newPrice),
      };
      cartItems.push(item);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    setCurrentCount(currentCount + 1);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  function generate(charLength) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < charLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <>
      <Snackbar
        // key={"top" + "center"}
        key={1}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      <div
        key={props.productId}
        className="p-1 col-12 col-sm-6 col-md-4 col-lg-3 mt-3 p-0"
      >
        <div className="col-12">
          <div className="mt-2 pt-2 pt-md-0">
            <div
              className=" text-center d-flex justify-content-center align-items-center bg-light"
              style={{
                height: "300px",
                overflow: "hidden",
                borderRadius: "10px",
              }}
              data-toggle="modal"
              data-target={"#" + props.productId}
            >
              <img
                style={{ width: "auto", height: "100%" }}
                src={props.product.image}
                alt=""
              />
              {props.product.isSoldOut === true ? (
                <img
                  style={{
                    // width: "100px",
                    // height: "100px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                  src={require("../images/sold.png")}
                  alt=""
                />
              ) : (
                <></>
              )}
            </div>
            <div className="mt-1">
              {/* <button id={"#check" + props.productId}>button</button> */}
              <h5 className="productName">{props.product.productName}</h5>
              <h5 className="newPrice">{"UGX " + props.product.newPrice}</h5>
              <h5 className="oldPrice">{"UGX " + props.product.oldPrice}</h5>
            </div>
            <div className="productCard pb-2 d-flex align-items-center">
              <CustomBtnOutline
                textColor="#e7008a"
                bgColor="white"
                fontSize="20px"
                text="preview"
                width="100%"
                black={false}
                handleOnClick={handleClickOpen}
              />
              <AddShoppingCartIcon
                className="icon ml-2"
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={() => handleAddToCart(props.product)}
              />
            </div>
            <div
              className="modal fade"
              id={props.productId}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
              data-focus="false"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <button
                    type="button"
                    className="close position-absolute text-white"
                    style={{
                      zIndex: 2,
                      right: "10px",
                      top: "10px",
                      fontSize: "30px",
                    }}
                    data-dismiss="modal"
                  >
                    &times;
                  </button>
                  <div className="bg-dark modal-body p-0 d-flex justify-content-center align-items-center">
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={props.product.image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={open} onClose={handleClose} style={{ zIndex: "999" }}>
          <CardHeader
            className="themeBg text-white"
            title={props.product.productName}
          />

          <DialogContent className="row  w-100 mx-auto p-0" scroll="paper">
            <div className="col-12 col-lg-6  p-0">
              <div
                className="carousel  slide "
                data-interval="5000"
                data-pause="false"
                data-ride="carousel"
                id="carouselExampleDark5"
              >
                <div className="carousel-inner w-100 ">
                  <div className="carousel-item active">
                    <div
                      className="imageDiv bg-light text-center d-flex justify-content-center align-items-center"
                      style={{
                        height: "300px",
                        overflow: "hidden",
                        // borderRadius: "10px",
                      }}
                      data-toggle="modal"
                      data-target={"#" + props.productId}
                    >
                      <img
                        style={{ width: "auto", height: "100%" }}
                        src={props.product.image}
                        alt=""
                      />
                    </div>
                  </div>
                  {props.product.moreImages.map((image) => {
                    // var keyValue = generate(8);
                    return (
                      <>
                        <div className="carousel-item">
                          <div
                            className="imageDiv text-center d-flex justify-content-center align-items-center"
                            style={{ height: "300px", overflow: "hidden" }}
                            onClick={() => handleShow(image)}
                          >
                            <img
                              style={{ width: "auto", height: "100%" }}
                              src={image}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}
                  {props.product.moreImages.length !== 0 ? (
                    <>
                      <span
                        class="carousel-control-prev visually-hidden"
                        data-target="#carouselExampleDark5"
                        data-slide="prev"
                      >
                        <ArrowCircleLeftRounded
                          className="themeColor"
                          style={{ fontSize: "30px" }}
                        />
                      </span>
                      <span
                        class="carousel-control-next"
                        data-target="#carouselExampleDark5"
                        data-slide="next"
                      >
                        <ArrowCircleRightRounded
                          className="themeColor"
                          style={{ fontSize: "30px" }}
                        />
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 p-0">
              <div className="p-2">
                <div className="mt-1">
                  {/* <button id={"#check" + props.productId}>button</button> */}
                  <h5 className="productName">{props.product.productName}</h5>
                  <h5 className="newPrice">
                    {"UGX " + props.product.newPrice}
                  </h5>
                  <h5 className="oldPrice">
                    {"UGX " + props.product.oldPrice}
                  </h5>
                </div>
                <CustomText fontSize="15px" name={props.product.description} />
                {props.product.preDescriptions.map((desc) => {
                  var keyValue = generate(8);
                  return (
                    <div className="mt-0" key={keyValue}>
                      <div className="d-flex align-items-center">
                        <CustomText
                          fontSize="15px"
                          className="mr-2"
                          name={desc.name + ": "}
                        />
                        <CustomText name={desc.value} />
                      </div>
                    </div>
                  );
                })}
                <CustomBtnOutline
                  textColor="black"
                  bgColor="white"
                  fontSize="20px"
                  text="add to cart"
                  width="100%"
                  black={true}
                  handleOnClick={() => handleAddToCart(props.product)}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button className="themeColor" onClick={handleClose}>
              back
            </Button>
          </DialogActions>
        </Dialog>

        {/* <div
          className="modal fade"
          id="imageModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-focus="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close position-absolute text-white"
                style={{
                  zIndex: 2,
                  right: "10px",
                  top: "10px",
                  fontSize: "30px",
                }}
                data-dismiss="modal"
              >
                &times;
              </button>
              <div className="bg-dark modal-body p-0 d-flex justify-content-center align-items-center">
                <img
                  style={{ width: "100%", height: "auto" }}
                  src={toShowImage}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import Typography from "@mui/material/Typography";
import Heading1 from "../components/heading1";
import CustomBtnOutline from "../components/customBtnOutline";
import {
  AddBox,
  Done,
  IndeterminateCheckBox,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { CartCounterContext } from "../components/cartCounter";
import { CustomText } from "../components/CustomText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CustomFormField from "../components/formField";
import { AuthContext } from "../components/auth";
import DialogContent from "@mui/material/DialogContent";
import { auth, db, provider } from "../firebase-config";
import statusUpdate from "../manager";

export default function CartPage(props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openNumberDialog, setOpenNumberDialog] = useState(false);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [openOrderSuccessDialog, setOpenOrderSuccessDialog] = useState(false);
  const { currentCount, setCurrentCount } = useContext(CartCounterContext);
  const [items, setItems] = useState([]);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gotUser, setGotUser] = useState(false);
  const [uid, setUid] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    statusUpdate("cart", 1);
    setIsLoading(false);
    var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    var grandTotal = 0;
    cartItems.forEach(function (item, index) {
      grandTotal = grandTotal + item.totalCost;
    });
    setGrandTotal(grandTotal);
    setItems(cartItems);
  }, []);

  const handleOpenDelete = (clickedItem) => {
    setItemToRemove(clickedItem);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleRemove = () => {
    const newItemsList = items.filter((item) => item.id !== itemToRemove.id);
    localStorage.setItem("cartItems", JSON.stringify(newItemsList));
    var totalItems = 0;
    var grandTotal = 0;
    newItemsList.forEach(function (item, index) {
      totalItems = totalItems + item.quantity;
      grandTotal = grandTotal + item.totalCost;
    });
    setGrandTotal(grandTotal);
    setItems(newItemsList);
    setCurrentCount(totalItems);
    setOpenDeleteDialog(false);
  };

  const handleIncrease = (product) => {
    items.map(function (item, index) {
      if (item.id === product.id) {
        item.quantity = item.quantity + 1;
        item.totalCost = item.quantity * item.newPrice;
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
    var totalItems = 0;
    var grandTotal = 0;
    items.forEach(function (item, index) {
      totalItems = totalItems + item.quantity;
      grandTotal = grandTotal + item.totalCost;
    });
    setGrandTotal(grandTotal);
    setItems(items);
    setOpenSnack(true);
    setCurrentCount(totalItems);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleDecrease = (product) => {
    if (product.quantity !== 1) {
      items.map(function (item, index) {
        if (item.id === product.id) {
          item.quantity = item.quantity - 1;
          item.totalCost = item.quantity * item.newPrice;
        }
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
      var totalItems = 0;
      var grandTotal = 0;
      items.forEach(function (item, index) {
        totalItems = totalItems + item.quantity;
        grandTotal = grandTotal + item.totalCost;
      });
      setGrandTotal(grandTotal);
      setItems(items);
      setOpenSnack(true);
      setCurrentCount(totalItems);
    }
  };

  const handlePlaceOrder = (isLarge) => {
    // setOpenOrderDialog(true);
    setOpenNumberDialog(true);

    // if (currentUser !== null) {
    //   handleContinue(isLarge, currentUser.uid);
    // }
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

  const signInWithGoogle = (isLarge) => {
    try {
      signInWithPopup(auth, provider).then(async (result) => {
        db.collection("users")
          .doc(result.user.uid)
          .get()
          .then((document) => {
            if (document.exists) {
              handleContinue(isLarge, result.user.uid);
            } else {
              console.log("creating user");
              db.collection("users")
                .doc(result.user.uid)
                .set({
                  uid: result.user.uid,
                  name: result.user.displayName,
                  email: result.user.email,
                  profilePhoto: result.user.photoURL,
                  phoneNumber: "",
                })
                .then(() => {
                  setUid(result.user.uid);
                  setOpenNumberDialog(true);
                });
            }
          });
      });
    } catch (error) {
      setErrorMessage("An arror occurred while signing in. Please try again.");
      setOpenErrorSnack(true);
    }
  };

  const handleCloseOrder = () => {
    setOpenOrderDialog(false);
  };

  const handleCloseErrorSnack = () => {
    setOpenErrorSnack(false);
  };

  const handleCloseOrderSuccess = () => {
    setOpenOrderSuccessDialog(false);
  };

  const handleClosePhone = () => {
    setOpenNumberDialog(false);
  };

  const handleContinue = (isLargeScreen) => {
    if (phoneNumber.trim() == "") {
      return;
    }
    try {
      setOpenNumberDialog(false);
      setOpenOrderDialog(true);
      console.log("creating order");
      var userOrderID = generate(12);
      let today = new Date().toLocaleString("en-US", {
        timeZone: "Africa/Kampala",
      });
      // console.log("using this id...", userUid);
      // if (currentUser === null) {
      //   console.log("entered here...");
      //   db.collection("users")
      //     .doc(userUid)
      //     .set(
      //       {
      //         phoneNumber: parseInt(phoneNumber),
      //       },
      //       { merge: true }
      //     );
      // }

      db.collection("orders")
        .add({
          // uid: userUid,
          orderId: userOrderID,
          itemsCount: currentCount,
          grandTotalCost: grandTotal,
          phoneNumber: phoneNumber,
          madeOn: today,
        })
        .then((doc) => {
          items.forEach(function (item, index) {
            db.collection("orders").doc(doc.id).collection("orderItems").add({
              id: item.id,
              name: item.name,
              image: item.image,
              newPrice: item.newPrice,
              oldPrice: item.oldPrice,
              quantity: item.quantity,
              totalCost: item.totalCost,
            });
          });
          var url = window.location.href;
          var madeUrl;
          var result = url.split("/");
          var madeUrl =
            result[0] + result[1] + result[2] + "/cart_details/?id=" + doc.id;
          if (isLargeScreen === true) {
            setPhoneNumber("");
            setOpenOrderDialog(false);
            setSuccessMessage(
              "Your order has been placed successfully!! We shall contact you shortly."
            );
            setOpenOrderSuccessDialog(true);
          } else {
            window.location.href =
              "https://api.whatsapp.com/send?phone=" +
              "+256740594795" +
              "&text=My order link:  " +
              madeUrl;
            setPhoneNumber("");
            setOpenOrderDialog(false);
            setSuccessMessage(
              "Your order has been created successfully!! Redirecting to whatsapp..."
            );
            setOpenOrderSuccessDialog(true);
          }
        });
    } catch (error) {
      setErrorMessage(
        "An arror occurred while creating order. Please try again."
      );
      setOpenErrorSnack(true);
      setOpenOrderDialog(false);
    }
  };

  return !isLoading ? (
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
          item quantity updated successfully
        </Alert>
      </Snackbar>
      <Snackbar
        // key={"top" + "center"}
        key={1}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseErrorSnack}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Dialog open={openOrderDialog}>
        <>
          <div className="text-center py-2">
            <CustomText
              fontSize="20px"
              className="mx-5 themeColor"
              name="processing order!"
            />
            <CustomText
              fontSize="15px"
              className="mx-2"
              name="please wait..."
            />
            <div class="my-2 lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        </>
      </Dialog>
      <Dialog open={openDeleteDialog}>
        <>
          <div className="p-2 text-center">
            <Typography
              style={{ fontSize: "17px" }}
              className="d-block mx-3 mb-2"
              variant="body5"
            >
              Are you sure want to remove this product from cart?
            </Typography>
          </div>
          <DialogActions>
            <Button className="themeColor" onClick={handleCloseDelete}>
              cancel
            </Button>
            <Button className="text-danger" onClick={handleRemove}>
              confirm
            </Button>
          </DialogActions>
        </>
      </Dialog>
      <Dialog open={openOrderSuccessDialog}>
        <>
          <div className="p-2 text-center">
            <Done className="text-success my-2" style={{ fontSize: "100px" }} />
            <CustomText
              className="d-block mx-3 mb-2"
              fontSize="20px"
              name={successMessage}
            />
          </div>
          <DialogActions>
            <Button className="themeColor" onClick={handleCloseOrderSuccess}>
              OK
            </Button>
          </DialogActions>
        </>
      </Dialog>
      <Dialog open={openNumberDialog}>
        <>
          <DialogContent>
            <CustomText
              fontSize="15px"
              className="text-left my-0"
              name="please share your phone number. We shall use it to contact you about your order."
            />
            <div className="mb-3">
              <CustomFormField
                isTextAreat="false"
                type="number"
                label="phone number"
                name="phone number"
                handleChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
                value={phoneNumber}
                required={true}
                maxLength="15"
                placeholder="07..."
              />
            </div>
            <div className="d-none d-lg-block text-center">
              <CustomBtnOutline
                textColor="#e7008a"
                bgColor="white"
                fontSize="20px"
                text="continue"
                // width="60%"
                handleOnClick={() => handleContinue(true)}
              />
            </div>
            <div className="d-lg-none text-center">
              <CustomBtnOutline
                textColor="#e7008a"
                bgColor="white"
                fontSize="20px"
                text="continue"
                // width="60%"
                handleOnClick={() => handleContinue(false)}
              />
            </div>
            <DialogActions>
              <Button className="text-dark" onClick={handleClosePhone}>
                cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </>
      </Dialog>
      <div style={{ marginBottom: "200px" }} className="content container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-7">
            <div className="cartBar themeBg px-3 d-flex justify-content-between">
              <Heading1 text="shopping cart" fontSize="17px" color="white" />
              <Heading1
                text={
                  currentCount !== 1
                    ? currentCount + " items"
                    : currentCount + " item"
                }
                fontSize="20px"
                color="white"
              />
            </div>

            {items.length !== 0 ? (
              items.map((item) => {
                return (
                  <div key={item.id} className="card m-1 mb-3">
                    <div className="row m-2">
                      <div className="col-12 col-md-5">
                        <div
                          className=" text-center d-flex justify-content-center align-items-center"
                          style={{ height: "300px", overflow: "hidden" }}
                        >
                          <img
                            style={{ width: "auto", height: "100%" }}
                            src={item.image}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-7">
                        <div className="mt-1">
                          <h5 className="productName">{item.name}</h5>
                          <h5 className="newPrice">
                            {"UGX: " + item.newPrice}
                          </h5>
                          <h5 className="oldPrice">
                            {"UGX: " + item.oldPrice}
                          </h5>
                        </div>
                        <div>
                          <div className="d-flex">
                            <IndeterminateCheckBox
                              onClick={() => handleDecrease(item)}
                              className="themeColor "
                              style={{ cursor: "pointer" }}
                            />
                            <h5
                              className="productName mx-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {item.quantity}
                            </h5>
                            <AddBox
                              onClick={() => handleIncrease(item)}
                              className="themeColor "
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <Heading1 text="TOTAL COST: " fontSize="15px" />
                          <Heading1
                            text={"UGX: " + item.totalCost}
                            fontSize="20px"
                            fontWeight="bold"
                          />
                        </div>
                        <CustomBtnOutline
                          textColor="black"
                          bgColor="white"
                          fontSize="20px"
                          text="remove"
                          width="60%"
                          black={true}
                          handleOnClick={() => handleOpenDelete(item)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-5">
                <ShoppingCartRounded style={{ fontSize: "50px" }} />
                <CustomText
                  fontSize="20px"
                  className="my-3"
                  name="you have no item on cart."
                />
              </div>
            )}
          </div>
          <div className="checkOutDiv col-12 col-lg-5 h-50">
            <div className="card m-1 mb-3 text-center">
              <Heading1 text="order summary" fontSize="25px" />
              <div className="mx-2 my-3 d-flex justify-content-between">
                <Heading1 text="ORDER COST:" fontSize="17px" />
                <Heading1
                  text={"UGX: " + grandTotal}
                  fontSize="20px"
                  fontWeight="bold"
                />
              </div>
              {items.length !== 0 ? (
                <>
                  <div className="d-none d-lg-block text-center mb-3">
                    <CustomBtnOutline
                      textColor="#e7008a"
                      bgColor="white"
                      fontSize="20px"
                      text="place order"
                      width="60%"
                      handleOnClick={() => handlePlaceOrder(true)}
                    />
                  </div>
                  <div className="d-lg-none text-center mb-3">
                    <CustomBtnOutline
                      textColor="#e7008a"
                      bgColor="white"
                      fontSize="20px"
                      text="place order"
                      width="60%"
                      handleOnClick={() => handlePlaceOrder(false)}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div class="divLoader">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

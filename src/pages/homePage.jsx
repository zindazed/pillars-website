import React, { useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import Heading1 from "../components/heading1";
import Products from "../components/products";
import HomeCarousel from "../components/HomeCarousel";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { db } from "../firebase-config";
import { CustomText } from "../components/CustomText";
import CustomBtnOutline from "../components/customBtnOutline";
import TopImageSlider from "../components/TopImageSlider";
import statusUpdate from "../manager";
import { useNavigate } from "react-router-dom";

export default function HomePage(props) {
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setLoadingProducts] = useState(true);
  const [isEmptyProducts, setIsEmptyProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [productslastKey, setProductslastKey] = useState();
  const [isLoadingMoreProducts, setLoadingMoreProducts] = useState(false);

  const allProducts = db.collection("products").where("showOnHome", "==", true);

  useEffect(() => {
    statusUpdate("home", 1);
    setIsLoading(false);
    async function fetchData() {
      try {
        await allProducts
          .limit(10)
          .orderBy("addedOn", "desc")
          .get()
          .then((collections) => {
            statusUpdate("dbQueries", 1);
            setLoadingProducts(false);
            updateproductsState(collections);
          });
      } catch (error) {
        setOpenErrorSnack(true);
      }
    }
    fetchData();
  }, []);

  const updateproductsState = (collections) => {
    const isCollectionEmpty = collections.size === 0;
    if (!isCollectionEmpty) {
      const fetchedproducts = [];
      collections.forEach((doc) => {
        fetchedproducts.push({
          productId: doc.id,
          productContent: doc.data(),
        });
      });
      const Lastdoc = collections.docs[collections.docs.length - 1];
      setProducts(products.concat(fetchedproducts));
      setProductslastKey(Lastdoc);
    } else {
      setIsEmptyProducts(true);
    }
    setLoadingMoreProducts(false);
  };

  const fetchMoreproducts = () => {
    setLoadingMoreProducts(true);
    allProducts
      .startAfter(productslastKey)
      .limit(10)
      .get()
      .then((collections) => {
        statusUpdate("dbQueries", 1);
        updateproductsState(collections);
      });
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleCloseErrorSnack = () => {
    setOpenErrorSnack(false);
  };

  const gotToShow = () => {
    navigate("shop");
  };

  return !isLoading ? (
    <>
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
          An error occurred. please check your internet connection!
        </Alert>
      </Snackbar>

      <div style={{ marginTop: "60px" }} className="container">
        <div className="customCard topDiv row">
          <div className="d-flex justify-content-left align-items-center col-12 col-md-7">
            <div className="ml-md-4">
              <Heading1
                className="abril themeColor text-left"
                text="Hijab gallery"
              />
              <CustomText
                fontSize="30px"
                fontWeight="bold"
                name="Your one stop for all kinds of muslim wear. Take a pick and be sure of quality!"
              />
              <div className="d-none d-md-block">
                <CustomBtnOutline
                  text="SHOP NOW"
                  textColor={"white"}
                  bgColor={"black"}
                  width="50%"
                  fontSize="20px"
                  black={true}
                  handleOnClick={() => gotToShow()}
                />
              </div>
            </div>
          </div>
          <div
            style={{ overflowY: "hidden" }}
            className="col-12 col-md-5 h-100 d-md-flex d-lg-block align-items-center"
          >
            <TopImageSlider />
          </div>
        </div>
      </div>

      {/* <TopSlider /> */}

      <div className="text-left text-md-center mx-3 my-4">
        <Heading1
          className="abril text-dark"
          text="Trust us to enhance your looks. We are good at it!"
        />
      </div>

      <HomeCarousel />

      <div className="container-fluid d-none d-md-block">
        <div className="row d-flex justify-content-center">
          <div className="image d-flex align-items-center text-center p-2 col-12 col-md-2 col-lg-3">
            <img
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              src={require("../images/img1.jpg")}
              alt=""
            />
          </div>
          <div className="image d-flex align-items-center col-12 text-center p-2 col-md-2 col-lg-3">
            <img
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              src={require("../images/img7.jpg")}
              alt=""
            />
          </div>
          <div className="image d-flex align-items-center col-12 text-center p-2 col-md-2 col-lg-3">
            <img
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              src={require("../images/img3.jpg")}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <Heading1 className="abril" text="Our top sellers" />
      </div>
      {products.length !== 0 ? (
        <>
          <Products products={products} />
          {isLoadingMoreProducts && (
            <div
              style={{ marginBottom: "100px", marginTop: "20px" }}
              className=" text-center py-3"
            >
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {!isLoadingMoreProducts && !isEmptyProducts && !isLoadingProducts && (
            <>
              <div
                style={{ marginBottom: "100px", marginTop: "20px" }}
                className="d-none d-md-block text-center"
              >
                <CustomBtnOutline
                  textColor="black"
                  bgColor="white"
                  fontSize="20px"
                  text="view more products"
                  width="25%"
                  black={true}
                  handleOnClick={() => fetchMoreproducts()}
                />
              </div>
              <div
                style={{ marginBottom: "100px", marginTop: "20px" }}
                className="d-md-none text-center"
              >
                <CustomBtnOutline
                  textColor="black"
                  bgColor="white"
                  fontSize="20px"
                  text="view more products"
                  width="80%"
                  black={true}
                  handleOnClick={() => fetchMoreproducts()}
                />
              </div>
            </>
          )}
          {isEmptyProducts && !isLoadingProducts && products.length !== 0 && (
            <div
              style={{ marginBottom: "100px", marginTop: "20px" }}
              className=" text-center py-3"
            >
              <CustomText fontSize="15px" name="no more products to show" />
            </div>
          )}
        </>
      ) : (
        <div
          className="d-flex justify-content-center w-100"
          style={{ marginBottom: "200px", marginTop: "100px" }}
        >
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="divLoader">
      <div
        style={{ marginBottom: "200px", marginTop: "100px" }}
        className="lds-ripple"
      >
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

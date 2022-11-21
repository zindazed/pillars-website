import React, { useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import Heading1 from "../components/heading1";
import Products from "../components/products";
import CustomBtnOutline from "../components/customBtnOutline";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { db, storage } from "../firebase-config";
import { CustomText } from "../components/CustomText";
import statusUpdate from "../manager";

export default function ShopPage(props) {
  const [openSnack, setOpenSnack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setLoadingProducts] = useState(true);
  const [isEmptyProducts, setIsEmptyProducts] = useState(false);
  const [isEmptyMoreProducts, setIsEmptyMoreProducts] = useState(false);
  var [products, setProducts] = useState([]);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [isLoadingCategories, setLoadingCategories] = useState(true);
  const [isEmptyCategories, setIsEmptyCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCat, setCurrentCat] = useState("");
  const [productslastKey, setProductslastKey] = useState();
  const [isLoadingMoreProducts, setLoadingMoreProducts] = useState(false);

  const allCategories = db.collection("categories");

  useEffect(() => {
    statusUpdate("shop", 1);
    setIsLoading(false);
    async function fetchCategories() {
      try {
        await allCategories.get().then(async (collections) => {
          statusUpdate("dbQueries", 1);
          setLoadingCategories(false);
          updateCategoriesState(collections);
          // console.log("category in use", collections.docs.at(0).data().name);
          var firstCat = collections.docs.at(1).data().name;
          setCurrentCat(firstCat);
          getProducts(firstCat);
        });
      } catch (error) {
        setOpenErrorSnack(true);
      }
    }
    fetchCategories();
  }, []);

  const getProducts = async (category) => {
    statusUpdate("dbQueries", 1);
    setLoadingProducts(true);
    setCurrentCat(category);
    setIsEmptyMoreProducts(false);
    await db
      .collection("products")
      .limit(10)
      .where("category", "==", category)
      .orderBy("addedOn", "desc")
      .get()
      .then((collection) => {
        setLoadingProducts(false);
        var empty = [];
        products = empty;
        setProducts([]);
        updateproductsState(collection);
      });
  };

  const updateCategoriesState = (collections) => {
    const isCollectionEmpty = collections.size === 0;
    if (!isCollectionEmpty) {
      const fetched_categories = [];
      collections.forEach((doc) => {
        fetched_categories.push({
          catId: doc.id,
          catContent: doc.data(),
        });
      });
      setCategories(categories.concat(fetched_categories));
    } else {
      setIsEmptyCategories(true);
    }
  };

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
      setIsEmptyProducts(false);
      const Lastdoc = collections.docs[collections.docs.length - 1];
      setProducts(products.concat(fetchedproducts));
      setProductslastKey(Lastdoc);
    } else {
      setIsEmptyProducts(true);
    }
    setLoadingMoreProducts(false);
  };

  const updateMoreproductsState = (collections) => {
    const isCollectionEmpty = collections.size === 0;
    if (!isCollectionEmpty) {
      const fetchedproducts = [];
      collections.forEach((doc) => {
        fetchedproducts.push({
          productId: doc.id,
          productContent: doc.data(),
        });
      });
      // setIsEmptyProducts(false);
      const Lastdoc = collections.docs[collections.docs.length - 1];
      setProducts(products.concat(fetchedproducts));
      setProductslastKey(Lastdoc);
    } else {
      setIsEmptyMoreProducts(true);
    }
    setLoadingMoreProducts(false);
  };

  const fetchMoreproducts = async () => {
    setLoadingMoreProducts(true);
    setIsEmptyMoreProducts(false);
    await db
      .collection("products")
      .limit(10)
      .where("category", "==", currentCat)
      .orderBy("addedOn", "desc")
      .startAfter(productslastKey)
      .get()
      .then((collections) => {
        statusUpdate("dbQueries", 1);
        updateMoreproductsState(collections);
      });
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleCloseErrorSnack = () => {
    setOpenErrorSnack(false);
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
          An error occurred. Failed to fetch products!
        </Alert>
      </Snackbar>
      <div className="text-center mt-5">
        <Heading1 className="abril" text="our categories" />
      </div>
      <div className="container d-flex justify-content-center px-auto">
        <div className="categories">
          {categories.length !== 0 ? (
            categories.map((category) => {
              return (
                <div className="px-1">
                  <CustomBtnOutline
                    key={category.catId}
                    text={category.catContent.name}
                    textColor={
                      currentCat === category.catContent.name
                        ? "white"
                        : "black"
                    }
                    bgColor={
                      currentCat === category.catContent.name
                        ? "black"
                        : "white"
                    }
                    borderRadius="20px"
                    fontSize="20px"
                    black={true}
                    handleOnClick={() => getProducts(category.catContent.name)}
                  />
                </div>
              );
            })
          ) : (
            <>
              <div
                style={{ borderRadius: "20px" }}
                className="w-50 my-1 bg-light h-25 mx-2 py-4"
              ></div>
              <div
                style={{ borderRadius: "20px" }}
                className="w-50 my-1 bg-light h-25 mx-2 py-4"
              ></div>
              <div
                style={{ borderRadius: "20px" }}
                className="w-50 my-1 bg-light h-25 mx-2 py-4"
              ></div>
              <div
                style={{ borderRadius: "20px" }}
                className="d-none d-md-block w-50 my-1 bg-light h-25 mx-2 py-4"
              ></div>
              <div
                style={{ borderRadius: "20px" }}
                className="d-none d-md-block w-50 my-1 bg-light h-25 mx-2 py-4"
              ></div>
              <div
                style={{ borderRadius: "20px" }}
                className="d-none d-md-block w-50 my-1 bg-light h-25 mx-2 py-4"
              ></div>
            </>
          )}
        </div>
      </div>
      <div
        className="text-center"
        style={{ paddingTop: "20px", marginBottom: "-20px" }}
      >
        <Heading1 text={currentCat} fontSize="30px" />
      </div>
      {!isLoadingProducts ? (
        !isEmptyProducts ? (
          <>
            <Products products={products} />
            {isLoadingMoreProducts && (
              <div
                style={{ marginBottom: "100px", marginTop: "20px" }}
                className=" text-center py-3"
              >
                <div class="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
            {!isLoadingMoreProducts &&
              !isEmptyMoreProducts &&
              !isLoadingProducts && (
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
            {isEmptyMoreProducts &&
              !isLoadingProducts &&
              products.length !== 0 && (
                <div
                  style={{ marginBottom: "100px", marginTop: "25px" }}
                  className=" text-center py-3"
                >
                  <CustomText fontSize="20px" name="no more products to show" />
                </div>
              )}
          </>
        ) : (
          <div
            className="text-center w-100"
            style={{ marginBottom: "200px", marginTop: "100px" }}
          >
            <CustomText name="no products to show" />
          </div>
        )
      ) : (
        <div
          style={{ paddingTop: "100px", paddingBottom: "200px" }}
          className="d-flex justify-content-center w-100"
        >
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="divLoader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

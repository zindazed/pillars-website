import React, { useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import Heading1 from "../components/heading1";
import { db } from "../firebase-config";
import { useSearchParams } from "react-router-dom";

export default function CartDetails(props) {
  const [searchparams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState(null);
  const [isEmptyProducts, setIsEmptyProducts] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      await db
        .collection("orders")
        .doc(searchparams.get("id"))
        .get()
        .then((gotOrder) => {
          setOrder(gotOrder.data());
        });
    }
    fetchOrder();
    async function fetchData() {
      await db
        .collection("orders")
        .doc(searchparams.get("id"))
        .collection("orderItems")
        .get()
        .then((collections) => {
          updateproductsState(collections);
        });
    }
    fetchData();
  }, []);

  const updateproductsState = (collections) => {
    const isCollectionEmpty = collections.size === 0;
    if (!isCollectionEmpty) {
      const fetchedItems = [];
      collections.forEach((doc) => {
        console.log("data for cart item", doc.data());
        fetchedItems.push({
          itemId: doc.id,
          itemContent: doc.data(),
        });
      });
      setItems(items.concat(fetchedItems));
    } else {
      setIsEmptyProducts(true);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "200px" }} className="content container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-7">
            <div className="cartBar themeBg px-3 d-flex justify-content-between">
              <Heading1 text="shopping cart" fontSize="17px" color="white" />
              {order != null ? (
                <Heading1
                  text={
                    order.itemsCount !== 1
                      ? order.itemsCount + " items"
                      : order.itemsCount + " item"
                  }
                  fontSize="20px"
                  color="white"
                />
              ) : (
                ""
              )}
            </div>

            {items.length !== 0 ? (
              items.map((item) => {
                return (
                  <div key={item.itemId} className="card m-1 mb-3">
                    <div className="row m-2">
                      <div className="col-12 col-md-5">
                        <div
                          className=" text-center d-flex justify-content-center align-items-center"
                          style={{ height: "300px", overflow: "hidden" }}
                        >
                          <img
                            style={{ width: "auto", height: "100%" }}
                            src={item.itemContent.image}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-7">
                        <div className="mt-1">
                          <h5 className="productName">
                            {item.itemContent.name}
                          </h5>
                          <h5 className="newPrice">
                            {"UGX: " + item.itemContent.newPrice}
                          </h5>
                          <h5 className="oldPrice">
                            {"UGX: " + item.itemContent.oldPrice}
                          </h5>
                        </div>
                        <div>
                          <div className="d-flex">
                            <h5
                              className="productName mx-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {item.itemContent.quantity}
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <Heading1 text="TOTAL COST: " fontSize="15px" />
                          <Heading1
                            text={"UGX: " + item.itemContent.totalCost}
                            fontSize="20px"
                            fontWeight="bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-5">
                <div class="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
          <div className="checkOutDiv col-12 col-lg-5 h-50">
            <div className="card m-1 mb-3 text-center">
              <Heading1 text="order summary" fontSize="25px" />
              <div className="mx-2 my-3 d-flex justify-content-between">
                <Heading1 text="ORDER COST:" fontSize="17px" />
                {order != null ? (
                  <Heading1
                    text={"UGX: " + order.grandTotalCost}
                    fontSize="20px"
                    fontWeight="bold"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

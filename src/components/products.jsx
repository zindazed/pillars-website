import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./productCard";
import $ from "jquery";

export default function Products(props) {
  const [toShowImage, setToShowImage] = useState("");

  const handleShow = (image) => {
    setToShowImage(image);
    $("#imageModal").modal("show");
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          {props.products.map((product) => {
            return (
              <ProductCard
                key={product.productId}
                productId={product.productId}
                product={product.productContent}
                handleSetToShowImage={handleShow}
              />
            );
          })}
        </div>
        <div
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
        </div>
      </div>
    </React.Fragment>
  );
}

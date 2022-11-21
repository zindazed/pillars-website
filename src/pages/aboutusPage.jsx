import React, { useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import Heading1 from "../components/heading1";
import { CustomText } from "../components/CustomText";
import statusUpdate from "../manager";

export default function AboutusPage(props) {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    statusUpdate("about", 1);
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <div className="mt-0">
      <div className="topBgLarge d-none d-md-block"></div>
      <div className="topBgSmall d-md-none"></div>

      <div className="container text-left my-5">
        <Heading1
          className="abril my-2"
          fontSize="50px"
          // color="gray"
          text="Modesty is the crown of a Muslimah. Shop the best-quality
           Islamic wear in all sizes for ladies, men and kids at affordable prices."
        />
      </div>

      <div className="aboutBg2 py-5">
        <div className="container">
          <div className="row ">
            <div className="col-12 col-md-6 p-2">
              <div className="card cardAbt text-center">
                {/* <div className="cardInner m-2"> */}
                <Heading1
                  className="mont my-2 themeColor"
                  text="contacts"
                  fontSize="25px"
                  fontWeight="bold"
                />
                <Heading1
                  className="mont my-2"
                  text="you can reach us via:"
                  fontSize="17px"
                />
                <div className="d-flex justify-content-left align-items-center ml-3 my-2">
                  <div style={{ width: "70px" }}>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={require("../images/5.png")}
                      alt=""
                    />
                  </div>
                  <div className="text-left ml-2">
                    <Heading1
                      className="mont my-2"
                      text="whatsapp"
                      fontSize="20px"
                    />
                    <Heading1
                      className="mont my-2"
                      text="+256740594795"
                      fontSize="17px"
                      fontWeight="bold"
                    />
                  </div>
                </div>
                {/* <div className="d-flex justify-content-left align-items-center ml-3 my-2">
                  <div className="ml-2 mr-3" style={{ width: "47px" }}>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={require("../images/12.png")}
                      alt=""
                    />
                  </div>
                  <div className="text-left ml-2">
                    <Heading1
                      className="mont my-2"
                      text="email"
                      fontSize="20px"
                    />
                    <Heading1
                      className="mont my-2"
                      text="hijabgallery@gmail.com"
                      fontSize="17px"
                      fontWeight="bold"
                    />
                  </div>
                </div> */}
                <div className="d-flex justify-content-left align-items-center ml-3 my-2">
                  <div className="ml-2 mr-3" style={{ width: "47px" }}>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={require("../images/13.png")}
                      alt=""
                    />
                  </div>
                  <div className="text-left ml-2">
                    <Heading1
                      className="mont my-2"
                      text="instagram"
                      fontSize="20px"
                    />
                    <Heading1
                      className="mont my-2"
                      text="hijabgalleyug"
                      fontSize="17px"
                      fontWeight="bold"
                    />
                  </div>
                </div>
                {/* <div className="d-flex justify-content-left align-items-center ml-3 my-2">
                  <div className="ml-2 mr-2" style={{ width: "50px" }}>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={require("../images/10.png")}
                      alt=""
                    />
                  </div>
                  <div className="text-left ml-2">
                    <Heading1
                      className="mont my-2"
                      text="twitter"
                      fontSize="20px"
                    />
                    <Heading1
                      className="mont my-2"
                      text="hijabgallery"
                      fontSize="17px"
                      fontWeight="bold"
                    />
                  </div>
                </div> */}
                {/* <div className="d-flex justify-content-left align-items-center ml-2 my-2">
                  <div className="mr-1" style={{ width: "75px" }}>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={require("../images/9.png")}
                      alt=""
                    />
                  </div>
                  <div className="text-left ml-2">
                    <Heading1
                      className="mont my-2"
                      text="hijabgallery"
                      fontSize="20px"
                    />
                    <Heading1
                      className="mont my-2"
                      text="hijabgallery"
                      fontSize="17px"
                      fontWeight="bold"
                    />
                  </div>
                </div> */}
                {/* </div> */}
              </div>
            </div>
            <div className="col-12 col-md-6 p-2 d-flex align-items-center">
              <div
                className="card cardAbt text-center"
                style={{ padding: "62px 50px" }}
              >
                {/* <div className="cardInner m-2 p-5"> */}
                <Heading1
                  className="mont my-2 themeColor"
                  text="location"
                  fontSize="25px"
                  fontWeight="bold"
                />
                {/* <Heading1 text="you can reach us via:" fontSize="17px" /> */}
                <div className="d-flex justify-content-center align-items-center mx-2">
                  <Heading1
                    className="mont my-2"
                    text="We are located in Ntinda at Mukisa mall, 
                    Shop No. K06 on the ground floor and Shop No. 
                    K16 on the 2nd floor"
                    fontSize="17px"
                    fontWeight="bold"
                  />
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-2">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-4 p-2">
            <a
              className="text-dark  text-decoration-none"
              href="tel:0740594795"
            >
              <div className="homeContacts d-flex align-items-center  p-2">
                <i className="fa fa-phone"></i>
                <div className="text">
                  <h5 className="themeColor font-weight-bold">Call us now</h5>
                  <CustomText fontSize="15px" name="For any inquiries" />
                </div>
              </div>
            </a>
          </div>
          <div className="col-12 col-md-4 p-2">
            <a
              className="text-dark text-decoration-none"
              href="https://api.whatsapp.com/send?phone=0740594795"
            >
              <div className="homeContacts d-flex align-items-center p-2">
                <i
                  style={{ fontSize: "35px !important" }}
                  className="fa fa-envelope"
                ></i>
                <div className="text">
                  <h5 className="themeColor font-weight-bold">
                    Whatsapp us now
                  </h5>
                  <CustomText
                    fontSize="15px"
                    name="We are always at your service"
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div
        style={{ paddingBottom: "90px" }}
        className="container-fluid text-center mx-auto"
      >
        <div className="text-center">
          <Heading1
            fontSize="25px"
            className="abril mt-3"
            text="Google Maps Locations"
          />
        </div>
        <iframe
          className="d-none d-md-block mt-3 mx-0 w-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.741600644806!2d32.61134661426807!3d0.3553163640634317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbcd4222365d%3A0x24490aedd08ecb76!2sMukisa%20Mall!5e0!3m2!1sen!2sug!4v1668337834643!5m2!1sen!2sug"
          width="1200"
          height="450"
          style={{ border: "0", textAlign: "center" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <iframe
          className="d-md-none mt-3 w-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.741600644806!2d32.61134661426807!3d0.3553163640634317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbcd4222365d%3A0x24490aedd08ecb76!2sMukisa%20Mall!5e0!3m2!1sen!2sug!4v1668337834643!5m2!1sen!2sug"
          width="600"
          height="450"
          style={{ border: "0", textAlign: "center" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  ) : (
    <div className="divLoader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

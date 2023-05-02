import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import components
import { Header } from "../component/Header";

export const Details = () => {
  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  // convert currency object into array
  const currentCurrency = Object.values(location?.state?.data?.currencies);
  // convert language object into array
  const currentLanguage = Object.values(location?.state?.data?.languages);

  return (
    <>
      <Header />
      <div className="home-section">
        <div className="container d-flex pt-3 pb-3">
          <button className="btn btn-dark" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>{" "}
            Back
          </button>
        </div>
        <div className="container d-flex justify-content-between align-items-center primary-section m-4 p-5 detail-section">
          <div className="info">
            <h1>{location?.state?.data?.name?.common}</h1>
            <p>
              <span>Official Name: </span>
              {location?.state?.data?.name?.official}
            </p>
            <p>
              <span>Population: </span>
              {location?.state?.data?.population?.toLocaleString("en-US")}
            </p>
            <p>
              <span>Region: </span>
              {location?.state?.data?.region}
            </p>
            <p>
              <span>Sub Region: </span>
              {location?.state?.data?.subregion}
            </p>
            <p>
              <span>Capital: </span>
              {location?.state?.data?.capital}
            </p>
            <p>
              <span>Currency: </span>
              {currentCurrency[0]?.name}
            </p>
            <p>
              <span>Language: </span>
              {currentLanguage.map((data, index) => {
                return (index ? ", " : "") + data;
              })}
            </p>
          </div>
          <img src={location?.state?.data?.flags?.png} className="detail-img img-fluid" />
        </div>
      </div>
    </>
  );
};

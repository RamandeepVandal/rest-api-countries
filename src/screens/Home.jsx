import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// component
import { Search } from "../component/Search";
import { Header } from "../component/Header";

export const Home = () => {
  // all countries from api
  const [countries, setCountries] = useState([{}]);
  // continent change
  const [continent, setContinent] = useState([{}]);
  // switch between countries and continents
  const [option, setOption] = useState(true);

  // display data on app start
  useEffect(() => {
    getCountries();
  }, []);

  // fetch data
  const getCountries = async () => {
    const res = await fetch(
      `https://restcountries.com/v3.1/all?fields=name,flags,currencies,languages,capital,population,region,subregion`
    );
    const data = await res.json();
    setCountries(data);
  };

  // randomize the data
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  // create copy of state
  const copyCountries = shuffleArray(countries);
  const copyContinent = shuffleArray(continent);

  // navigation
  const navigate = useNavigate();
  const handleClick = (data) => navigate("/details", { state: { data } });

  // user selects different continent
  const changeContinent = async (userSelection) => {
    const res = await fetch(
     `https://restcountries.com/v3.1/region/${userSelection}?fields=name,flags,currencies,languages,capital,population,region,subregion`
    );
    const data = await res.json();
    setContinent(data);
    setOption(false);
  };

  return (
    <>
      <Header />
      <div className="home-section">
        <Search changeContinent={changeContinent} handleClick={handleClick}/>
        <div className="container d-flex justify-content-center flex-wrap primary-section">
          {option
            ? copyCountries?.slice(0, 8).map((country, key) => {
                return (
                  <div
                    className="card p-3 m-3 card-country"
                    key={key}
                    style={{ width: 15 + "em" }}
                    onClick={() => handleClick(country)}
                  > 
                    <img
                      src={country?.flags?.png}
                      alt="country flag"
                      className="card-img-top"
                      style={{ height: 5 + "em" }}
                    />
                    <h1 className="card-title mt-3">{country?.name?.common}</h1>
                    <p className="card-text">
                      <span>Capital:</span> {country?.capital}
                    </p>
                    <p className="card-text">
                      <span>Population:</span>{" "}
                      {country?.population?.toLocaleString("en-US")}
                    </p>
                  </div>
                );
              })
            : copyContinent?.slice(0, 8).map((country, key) => {
                return (
                  <div
                    className="card p-3 m-3 card-country"
                    key={key}
                    style={{ width: 15 + "em" }}
                    onClick={() => handleClick(country)}
                  >
                    <img
                      src={country?.flags?.png}
                      alt="country flag"
                      className="card-img-top"
                      style={{ height: 5 + "em" }}
                    />
                    <h1 className="card-title mt-3">{country?.name?.common}</h1>
                    <p className="card-text">
                      <span>Capital:</span> {country?.capital}
                    </p>
                    <p className="card-text">
                      <span>Population:</span>{" "}
                      {country?.population?.toLocaleString("en-US")}
                    </p>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

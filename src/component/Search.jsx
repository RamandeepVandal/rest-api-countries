import React, { useState } from "react";

export const Search = ({ changeContinent, handleClick }) => {
  // user search
  const [user, setUser] = useState("");
  // data from search
  const [searchData, setSearchData] = useState(undefined);

  // pass user selection to changeContinent func
  const submit = (e) => {
    changeContinent(e.target.value);
  };

  // user searches for specific country 
  const searchCountry = async (name) => {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,flags,currencies,languages,capital,population,region,subregion`
    );
    const data = await res.json();
    setSearchData(data);
  };

  // call the fetch func and check if data is recieved
  const searchIt = (user) => {
    searchCountry(user);

    if (searchData !== undefined) {
      handleClick(searchData[0]);
    }
  }

  return (
    <div className="container d-flex justify-content-evenly align-items-center pt-3 pb-3">
      <div className="input-group" style={{ width: 20 + "em" }}>
        <button className="btn btn-dark" onClick={() => searchIt(user)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Search for a country..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>

      <select
        className="form-select"
        aria-label="Default select example"
        style={{ width: 20 + "em" }}
        onChange={submit}
      >
        <option value="europe">Europe</option>
        <option value="north america">North America</option>
        <option value="south america">South America</option>
        <option value="asia">Asia</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>
  );
};

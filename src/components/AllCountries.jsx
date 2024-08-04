import { useEffect, useState } from "react";
import React from "react";
import { apiURL } from "../utilities/api";
import Search from "./Search";
import FilterCountry from "./FilterCountry";
import { Link, useNavigate } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setCountries(data);

      console.log(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Country not Found!");
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);

      if (!res.ok) throw new Error("Failed...!");
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };


  useEffect(() => {
    getAllCountries();
  }, []);

  const handleNavigate = (countryName) => {
    navigate(`/country/${countryName}`);
    console.log(countryName, "ayo")
  };

  return (
    <div className="country-wrapper">
      <div className="country-top">
        <div className="search">
          <Search onSearch={getCountryByName} />
        </div>

        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
      </div>
      <div className="country-bottom">
        {isLoading && !error && <h3>Loading.....</h3>}
        {error && !isLoading && <h3>{error}</h3>}

        {countries?.map((country) => (
          // <Link to={`/country/${country.name.common}`}>
            <div onClick={() => handleNavigate(country.name.common)} className="country-card">
              <div className="country-img">
                <img src={country.flags.png} alt="flag" />
              </div>
              <div className="country-data">
                <h2>{country.name.common}</h2>
                <h5>Population: {new Intl.NumberFormat().format(country.population)}</h5>
                <h5>Region: {country.region}</h5>
                <h5>Capital: {country.capital}</h5>
                <h5>Sub-Region: {country.subregion}</h5>


              </div>
            </div>
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;

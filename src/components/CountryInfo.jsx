import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../utilities/api";
import { Link } from "react-router-dom";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();



  useEffect(() => {
    const getCountryByName = async () => {
        try {
            const res = await fetch(`${apiURL}/name/${countryName}`);
    
          if (!res.ok) throw new Error("Country not Found!");
          const data = await res.json();
          setCountry(data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setError(error.message);
        }
      };
      console.log(countryName, "countryName")
      getCountryByName();
  }, [countryName]);

  return (
    <div className="country-info">
      <button>
        <Link to="/">Back</Link>
      </button>

      {isLoading && !error && <h3>Loading........</h3>}
      {error && !isLoading && <h3>{error}</h3>}
      
      {country?.map((country, index) => (
        <div className="info-container" key={index}>
            <div className="info-img">
                <img src={country.flags.png} alt="flag" />
            </div>
            <div className="info">
                <h2>{country.name.common}</h2>
                <div className="left">
                    <h4>Native Name: <span>{country.name.common}</span></h4>
                    <h4>Population: <span>{new Intl.NumberFormat().format(country.population)}</span></h4>
                    <h4>Region: <span>{country.region}</span></h4>
                    <h4>Sub-region: <span>{country.subregion}</span></h4>

                </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default CountryInfo;

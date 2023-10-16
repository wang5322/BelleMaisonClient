import React, {useRef, useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({ placeholder, properties, handleCityChange ,resetCityChange }) {
  const [filteredData, setFilteredData] = useState([]);
  const [inputCity, setInputCity] = useState("");
  const [wordEntered, setWordEntered] = useState("");
  const inputRef = useRef(null);

  const uniqueCities = ()=>{
        const uniqueCitiesSet = new Set();
        // Loop through the data and add city names to the Set
        properties.forEach((property) => {
            uniqueCitiesSet.add(property.city);
        });
        return Array.from(uniqueCitiesSet);
  }

  const citiesArray = uniqueCities();

  const handleFilterCity = (event) => {
    const search = event.target.value;
    setInputCity("");
    const newFilter = citiesArray.filter((value) => {
      return value.toLowerCase().includes(search.toLowerCase());
    });
    if (search === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    // setWordEntered("");
    // setInputCity("");
  };

  const setSearchCity = (value) => {
    inputRef.current.value = value;
    setInputCity(value);
    clearInput();
    handleCityChange(value);
  };

  const resetSearchCity = ()=>{
    inputRef.current.value = "";
    setInputCity("");
    clearInput();
    resetCityChange();
  }
  return (
    <div className="search">
      <div className="searchInputs">
        <input
            id="searchInput"
            type="text"
            placeholder={placeholder}
            onChange={handleFilterCity}
            ref={inputRef}
        ></input>
        <div className="searchIcon">
            {/* <SearchIcon onClick={()=>{setSearchCity(inputRef.current.value)}} /> */}
            {inputCity === "" ? (
            <SearchIcon onClick={()=>{setSearchCity(inputRef.current.value)}} />
            ) : (
            <CloseIcon id="clearBtn" onClick={resetSearchCity} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
                <a key={key} onClick={() => {setSearchCity(value);}} className="dataItem">
                    {value}
                </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

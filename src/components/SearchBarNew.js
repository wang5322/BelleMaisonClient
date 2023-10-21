import React, {useRef, useState } from "react";
import "../css/SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import SearchPanel from "./SearchPanelNew";


function SearchBar({ placeholder, properties,searchCriteria, handleCityChange ,resetChange, onSearch ,setVisible}) {
  const [filteredData, setFilteredData] = useState([]);
  const [inputCity, setInputCity] = useState("");
  const [wordEntered, setWordEntered] = useState("");
  const [isVisible, setIsVisible] = useState(false);
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

  const resetSearch = ()=>{
    inputRef.current.value = "";
    setInputCity("");
    clearInput();
    resetChange();
  }

  function setVisible( ){
     //console.log("= setVisible in SearchBar.js");
    setIsVisible(false);
}

  const toggle = ()=>{
    setIsVisible(!isVisible);
}

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          id="searchInput"
          type="text"
          placeholder={placeholder}
          onChange={handleFilterCity}
          onClick={()=>{setIsVisible(false)}}
          ref={inputRef}
        ></input>
          <div className="searchIcon">
              {/* {inputCity === "" ? ( */}
              <SearchIcon onClick={()=>{setSearchCity(inputRef.current.value)}} />
              {/* ) : (
              <CloseIcon id="clearBtn" onClick={resetSearchCity} />
            )} */}
            
          </div>
          <button className="moreoption" onClick={toggle}>More Option</button>
          <button className="moreoption" onClick={resetSearch}>Clear Search</button>
      </div>
      {isVisible && <SearchPanel searchCriteria={searchCriteria} onSearch={onSearch} setVisible={setVisible}/>} 
      {filteredData.length !== 0 && !isVisible &&(
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

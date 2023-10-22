import React, {useRef, useState } from "react";
import "../css/SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import SearchPanel from "./SearchPanelNew";
import { Row, Col, Container } from "react-bootstrap";


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
    <Container fluid className="search">
      <Row className="searchInputs">
        <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
                <Col xs={10} sm={10} md={10} lg={10}>
                  <input
                    id="searchInput"
                    type="text"
                    placeholder={placeholder}
                    onChange={handleFilterCity}
                    onClick={()=>{setIsVisible(false)}}
                    ref={inputRef}
                  ></input>
                </Col>
                <Col xs={2} sm={2} md={2}  lg={2} className="searchIcon">
                    {/* {inputCity === "" ? ( */}
                    <SearchIcon onClick={()=>{setSearchCity(inputRef.current.value)}} />
                    {/* ) : (
                    <CloseIcon id="clearBtn" onClick={resetSearchCity} />
                  )} */}
                </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={3} lg={2} style={{marginRight:20}}>
          <button className="moreoption" onClick={toggle}>More Option</button>
          </Col>
          <Col xs={12} sm={12} md={3}  lg={2}>
          <button className="moreoption" onClick={resetSearch}>Clear Search</button>
          </Col>
      </Row>
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
    </Container>
  );
}

export default SearchBar;

import React, { useState } from 'react';
import '../css/SearchPanel.css'

const SearchPanel = ({ searchCriteria, onSearch , setVisible}) => {
    //console.log("in onSearchPanel: searchCriteria=",searchCriteria);
  const [minPrice, setMinPrice] = useState(searchCriteria.minPrice);
  const [maxPrice, setMaxPrice] = useState(searchCriteria.maxPrice);
  const [propertyType, setPropertyType] = useState(searchCriteria.propertyType);
  const [bedrooms, setBedrooms] = useState(searchCriteria.bedrooms);
  const [bathrooms, setBathrooms] = useState(searchCriteria.bathrooms);
  const [yearBuilt, setYearBuilt] = useState(searchCriteria.yearBuilt);
console.log("bedrooms=",bedrooms );
  const handleSearch = () => {
    // Pass the selected search criteria to the parent component
    //console.log("=in SearchPanel handleSearch=");
    setVisible();
    onSearch({
      minPrice,
      maxPrice,
      propertyType,
      bedrooms,
      bathrooms,
      yearBuilt,
    });
  };

  return (
    <div className='panel-container'>
      <h4>Search Properties</h4>
      <div className='searchPanel'>
        <div>
            <div>
                <label>Min Price:</label>
                <select
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                >
                    <option value="0">Any</option>
                    <option value="100000">$100,000</option>
                    <option value="500000">$500,000</option>
                    <option value="1000000">$1,000,000</option>
                    <option value="1500000">$1,500,000</option>
                    <option value="2000000">$2,000,000</option>
                    <option value="2500000">$2,500,000</option>
                    <option value="3000000">$3,000,000</option>
                </select>
            </div>
            <div>
                <label>Max Price:</label>
                <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                >
                    <option value="100000000">Any</option>
                    <option value="500000">$500,000</option>
                    <option value="1000000">$1,000,000</option>
                    <option value="1500000">$1,500,000</option>
                    <option value="2000000">$2,000,000</option>
                    <option value="2500000">$2,500,000</option>
                    <option value="3000000">$3,000,000</option>
                    <option value="3500000">$3,500,000</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label>Property Type:</label>
                <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                >
                    <option value="">Any</option>
                    <option value="single-family">Single Family</option>
                    <option value="studio">Studio</option>
                    <option value="condo">Condo</option>
                    <option value="plex">Plex</option>
                    <option value="cottage">Cottage</option>
                </select>
            </div>
            <div>
                <label>Year Built:</label>
                <select
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                >
                    <option value="">Any</option>
                    <option value="2020">2020+</option>
                    <option value="2010">2010+</option>
                    <option value="2000">2000+</option>
                    <option value="1990">1990+</option>
                    <option value="1980">1980+</option>
                    <option value="1970">1970+</option>
                    <option value="1960">1960+</option>
                    <option value="1950">1950+</option>
                    <option value="1940">1940+</option>
                    <option value="1930">1930+</option>
                    <option value="1920">1920+</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label>Bedrooms:</label>
                <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                    <option value="6">6+</option>
                </select>
            </div>
            <div>
            <label>Bathrooms:</label>
            <select
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
            >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
                <option value="6">6+</option>
            </select>
            </div>
        </div>
        <div>
            <div>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <button onClick={setVisible}>Close</button>
            </div>
        </div>
    </div>
        
    </div>
  );
};

export default SearchPanel;


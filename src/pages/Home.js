import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "../css/Home.css";
import axios from "axios";
import Card from "../components/MDBCard";
import Sorting from "../components/Sorting";
import ReactPaginate from 'react-paginate';

function Home() {
  const initValue = {
    Pictures: { imageUrl: "" },
  };

    const [listOfProperties, setListOfProperties] = useState([initValue]);
    const [pageNumber, setPageNumber] = useState(0);
    const [city, setCity] = useState();
    const [searchCriteria , setSearchCriteria] = useState({});
    const [result,setResult] = useState(listOfProperties);

    const articlesPerPage = 4;
    const propertiesVisited = pageNumber * articlesPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/properties`)
      .then((response) => {
        setListOfProperties(response.data);
      })
      .catch((err) => {
        if (err.response.data.status !== 404) {
          alert("no records found!");
          return;
        }
      });
  }, []);

  const handleCityChange = (city) => {
    setCity(city);
  };

    const resetChange = ()=>{
        setCity("");
        setSearchCriteria({});
    }

    function onSearchabc( searchCriteria ){
        setSearchCriteria(searchCriteria);
    }

  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

    function filterData(listOfProperties, city){
        let filteredProperties = listOfProperties;
        if (city) {
            filteredProperties = filteredProperties.filter(
                ( property ) => {return property.city.toLowerCase() == city.toLowerCase()} );
        }
        if(isObjectEmpty(searchCriteria)){
//console.log("searchCriteria is empty:");
        }
        else{
//console.log("searchCriteria is not empty:",searchCriteria);
             let minPrice = 0;
             let maxPrice = 10000000000;
            if (!searchCriteria.minPrice=='') {
                minPrice = searchCriteria.minPrice;
            } 
            if (!searchCriteria.maxPrice == '' ) {
                maxPrice = searchCriteria.maxPrice;
            } 
        
            filteredProperties = filteredProperties.filter((property)=>{
//console.log("property",property);      
// console.log("property.bedrooms:",property.bedrooms);
// console.log("searchCriteria.bedrooms:",searchCriteria.bedrooms);
// console.log("property.bedrooms==searchCriteria.bedrooms:",property.bedrooms>=searchCriteria.bedrooms);
//console.log(property.price >= minPrice && property.price <= maxPrice);
                return (
                    (property.price >= minPrice && property.price <= maxPrice)
                    && (searchCriteria.propertyType =='' || property.type == searchCriteria.propertyType)
                    && (searchCriteria.bedrooms =='' || property.bedrooms >= searchCriteria.bedrooms)
                    && (searchCriteria.bathrooms =='' || property.bathrooms >= searchCriteria.bathrooms)
                    && (searchCriteria.yearBuilt =='' || property.year_built >= searchCriteria.yearBuilt)
                    )
            });
        }
        return filteredProperties;
    }

    useEffect(()=>{
        let filtered = filterData(listOfProperties, city);
        setResult(filtered);
    },[listOfProperties, city, searchCriteria])

    
    
    function handleSorting(sorting) {
        let sortedData;
        
        if (sorting === 'newest') {
            sortedData = [...result].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });
            
        }
        if (sorting === 'oldest') {
            sortedData = [...result].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA - dateB;
            });
            
        }
        if (sorting === 'priceAsc') {
          sortedData = [...result].sort((a, b) => a.price - b.price);
          
        }
        if (sorting === 'priceDesc') {
          sortedData = [...result].sort((a, b) => b.price - a.price);
          
        }
        setResult([...sortedData]);
        return sortedData;
      }


    const pageCount = Math.ceil(result.length / articlesPerPage);

    const displayProperties = result
        .slice(propertiesVisited, propertiesVisited + articlesPerPage)
        .map((property, key)=>{
        if (Array.isArray(property.Pictures) && property.Pictures.length > 0) {
       // Access the first picture's imageUrl
            const imageUrl = property.Pictures[0].imageUrl;
            return(
                <Card key={key} id={property.id} img={imageUrl} address={property.address} city={property.city} type={property.type}
                   bedrooms={property.bedrooms} bathrooms={property.bathrooms}
                   year_built={property.year_built} price={property.price} features={property.features} 
                />
        )}else{
            return(
                <Card key={key} id={property.id} img={'notFound'} address={property.address} city={property.city} type={property.type}
                   bedrooms={property.bedrooms} bathrooms={property.bathrooms}
                   year_built={property.year_built} price={property.price} features={property.features}

                />
           )
           }
       }
    )


  return (
    <>
      <main className="main-content">
        <div>
          <div
            className="p-5 text-center bg-image"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/7579042/pexels-photo-7579042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
              // style={{ backgroundImage: "url('../images/heroImage.jpg')",
              height: 400,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div
              className="mask"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center align-items-center h-500">
                <div className="text-white mb-5">
                  <h1 className="mt-5">
                    {listOfProperties.length} properties in Quebec
                  </h1>
                  <SearchBar
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                    }}
                    placeholder="Please input city..."
                    properties={listOfProperties}
                    handleCityChange={handleCityChange}
                    resetChange={resetChange}
                    onSearch={onSearchabc}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 ">
            <div style={{ display: 'flex' }}>
                    <div className="info">
                        {listOfProperties.length==result.length 
                        ? <h2>{listOfProperties.length} Newest Listing: </h2> 
                        : <h2>{result.length} Properties Filtered:</h2> }
                    </div>
                    <div className="sorting">
                        <Sorting handleSorting={handleSorting} />
                    </div>
            </div>
          <div className="card-container">
            {displayProperties}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              pageLinkClassName={"pageLink"} //added to modify page link number
            />
          </div>
        </div>
      </main>
    </>
  );
}
export default Home;

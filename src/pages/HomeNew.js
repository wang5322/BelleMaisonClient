import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBarNew";
import "../css/Home.css";
import axios from "axios";
import Card from "../components/MDBCard";
import Sorting from "../components/Sorting";
import Pagination from "../components/Pagination";

function HomeNew() {

     //minPrice,maxPrice,propertyType,bedrooms,bathrooms,yearBuilt,
    const initSearch={
        minPrice: 0,
        maxPrice: 100000000,
        propertyType: '',
        bedrooms: 0,
        bathrooms: 0,
        yearBuilt: '',
    }
    const [listOfProperties, setListOfProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    //const [city, setCity] = useState();
    const [searchCriteria , setSearchCriteria] = useState(initSearch);
    //const [result,setResult] = useState(listOfProperties);
    const [searchString, setSearchString] = useState('isActive:1');
    const [totalCount, setTotalCount] = useState(0);

    const articlesPerPage = 8;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/api/properties/search?page=${currentPage}&pageSize=${articlesPerPage}&searchString=${searchString}`)
            .then((response) => {
                setListOfProperties(response.data.properties);
                setTotalCount(response.data.totalCount);
                setTotalPage(response.data.totalPage);
                //console.log('totalpage=',Math.ceil(response.data.totalCount/articlesPerPage));
            })
            .catch((err) => {
                if (err.response.data.status !== 404) {
                alert("no records found!");
                return;
                }
            });
    }, [currentPage, searchString]);

    const handleCityChange = (city) => {
        //setCity(city);
        setCurrentPage(1);
        setSearchString(`isActive:1,city:${city}`);
    };

    const onPageChange = (currentPage)=>{
        setCurrentPage(currentPage);
    }

    const resetChange = ()=>{
console.log("resetChange");
        // setCity("");
        setSearchCriteria({});
        setCurrentPage(1);
        setSearchString("isActive:1");
    }

    //set up search string
    function onSearchabc( searchCriteria ){
console.log("in onSearchabc: searchCriteria",searchCriteria);
        let str = '';
        //setSearchCriteria(searchCriteria);
        if(isObjectEmpty(searchCriteria)){
            //console.log("searchCriteria is empty:");
        }else{
            if(!searchCriteria.bedrooms ==''){
                str = searchString + `,bedrooms:${searchCriteria.bedrooms}`;
            }
            if(!searchCriteria.bathrooms ==''){
                str = searchString + `,bathrooms:${searchCriteria.bathrooms}`;
            }
            if(!searchCriteria.minPrice ==''){
                str = searchString + `,minPrice:${searchCriteria.minPrice}`;
            }
            if(!searchCriteria.maxPrice ==''){
                str = searchString + `,maxPrice:${searchCriteria.maxPrice}`;
            }
            if(!searchCriteria.yearBuilt ==''){
                str = searchString + `,built_year:${searchCriteria.yearBuilt}`;
            }
            if(!searchCriteria.propertyType ==''){
                str = searchString + `,type:${searchCriteria.propertyType}`;
            }
        }
        //console.log("before in onSearchabc: searchCriteria",searchCriteria);
        setSearchString(str);
        //console.log("after in onSearchabc: searchCriteria",searchCriteria);
    }

    function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    
    
    
    function handleSorting(sorting) {
        let sortedData;
        
        if (sorting === 'newest') {
            sortedData = [...listOfProperties].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });
            
        }
        if (sorting === 'oldest') {
            sortedData = [...listOfProperties].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA - dateB;
            });
            
        }
        if (sorting === 'priceAsc') {
          sortedData = [...listOfProperties].sort((a, b) => a.price - b.price);
          
        }
        if (sorting === 'priceDesc') {
          sortedData = [...listOfProperties].sort((a, b) => b.price - a.price);
          
        }
        setListOfProperties([...sortedData]);
        return sortedData;
      }


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
                                {totalCount} properties in Quebec
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
                            searchCriteria={searchCriteria}
                            handleCityChange={handleCityChange}
                            resetChange={resetChange}
                            onSearch={onSearchabc}
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="p-5" >
            <div style={{ display: 'flex' }}>
                    <div className="info">
                         <h2>{listOfProperties.length} Properties Selected:</h2> 
                    </div>
                    <div className="sorting">
                        <Sorting handleSorting={handleSorting} />
                    </div>
            </div>
            <div className="card-container">
                {listOfProperties.map((property, key)=>{
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
                )}
                
            </div>
            <div className='pagination'>
                <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={onPageChange}/>
            </div>
        </div>
      </main>
    </>
  );
}
export default HomeNew;

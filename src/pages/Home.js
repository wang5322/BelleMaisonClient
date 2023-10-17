import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import './Home.css';
import axios from "axios";
import Card from "../components/MDBCard";
import ReactPaginate from 'react-paginate';

function Home() {

    const initValue = {
        Pictures:{ imageUrl:""}
    }

    const [listOfProperties, setListOfProperties] = useState([initValue]);
    const [pageNumber, setPageNumber] = useState(0);
    const [city, setCity] = useState();
    const articlesPerPage = 5;
    const propertiesVisited = pageNumber * articlesPerPage;

    

    const pageCount = Math.ceil(listOfProperties.length / articlesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(()=>{
        axios.get("http://localhost:3005/api/properties")
        .then((response)=>{
            setListOfProperties(response.data);
            // const uniqueCities = new Set();
            // // Loop through the data and add city names to the Set
            // response.data.forEach((property) => {
            //     uniqueCities.add(property.city);
            // });

            // // Convert the Set back to an array (if needed)
            // setUniqueCitiesArray(Array.from(uniqueCities));
        })
        .catch((err)=>{
            if(err.response.data.status!==404){
                alert("no records found!");
                return
            }
        })
    },[]);

    const handleCityChange = (city) => {
        //setListOfProperties(newData);
        setCity(city);
        console.log('city = ', city);
    };

    const resetCityChange = ()=>{
        setCity("");
    }

    function filterData(listOfProperties, city){
        let filteredProperties = listOfProperties;
        if (city) {
            filteredProperties = filteredProperties.filter(
                ( property ) => {return property.city.toLowerCase() == city.toLowerCase()} );
        }
        return filteredProperties;
    }

    const result = filterData(listOfProperties, city, "");


    const displayProperties = result
        .slice(propertiesVisited, propertiesVisited + articlesPerPage)
        .map((property, key)=>{
        if (Array.isArray(property.Pictures) && property.Pictures.length > 0) {
       //     // Access the first picture's imageUrl
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
            <div>
                <div className='p-5 text-center bg-image'
                    style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')",
                    // style={{ backgroundImage: "url('../images/heroImage.jpg')",
                        height: 400 ,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'}}>
                    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className='text-white mb-5'>
                                <h1 className='mt-5'>{listOfProperties.length} properties in Quebec</h1>
                                <SearchBar 
                                    placeholder = 'Please input city...' 
                                    properties={listOfProperties} 
                                    handleCityChange={handleCityChange}
                                    resetCityChange={resetCityChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-5 '>
                <h2>Newest listing: </h2>
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
                    />
                </div>
            </div>
        </>
    )
}
export default Home;
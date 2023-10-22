import React from "react";
import { Link } from "react-router-dom";

function PageNotFound(){
    return (
        <main className="main-content">
        <div>
            <h1>Page Not Found :/</h1>
            <h3>
                Go To The Home Page :<Link to="/">Home Page</Link>
            </h3>
        </div>
        </main>
    )
}

export default PageNotFound
import React from "react";
import { useLocation } from 'react-router-dom'
function NotFound () {
    let location  = useLocation()
    return(
        <h1>Resource is not found on {location.pathname}</h1>
    )
}

export default NotFound;
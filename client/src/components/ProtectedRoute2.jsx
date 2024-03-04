import React from 'react'
import {useSelector} from "react-redux"

import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute2 = ({children}) => {
    const isLogin = useSelector((state) => state.isLogin);
    

    if(isLogin) {
        return <Navigate to="/"/>
    }
 return children
}

export default ProtectedRoute2

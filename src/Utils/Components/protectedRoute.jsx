import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {

    const [role,setRole] = useState("");
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user")).role;
    setRole(user);
  },[])
    
  if (role==="admin") {
    // console.log("if admin")
    return children;
}
    return <Navigate to="admin/users" replace />;
};

export default ProtectedRoute;

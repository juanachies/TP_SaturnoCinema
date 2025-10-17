import { Navigate, Outlet } from "react-router";

const Protected = ({children, allowedTypes}) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = user?.type

    if (!token){
        return <Navigate to='/login' replace />
    }

    if (allowedTypes && !allowedTypes.includes(userType)) {
        return <Navigate to="/" />;
    }

    return children;
}

export default Protected
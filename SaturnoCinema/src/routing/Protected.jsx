import { Navigate, Outlet } from "react-router";

const Protected = ({children, allowedTypes}) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = user?.type

    const navigate = useNavigate()

    if (!token){
        return <Navigate to='/login' replace />
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" />;
    }

    return children;
}

export default Protected
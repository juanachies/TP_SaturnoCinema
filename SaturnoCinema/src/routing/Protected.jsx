import { useNavigate } from "react-router-dom";

const Protected = ({children, allowedTypes}) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = user?.type
}

export default Protected
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(4);


    const isLoggedIn = !!user;

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                "http://localhost:5000/api/route/user",
                { withCredentials: true }
            );
            setUser(response.data.userData || null);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const getServices = async (pageNumber = 1, limitNumber = 4) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/data/service?page=${pageNumber}&limit=${limitNumber}`
            );

            setServices(response.data.data);
            setTotalPages(response.data.totalPages);
            setPage(response.data.currentPage);
            console.log("This is page api")

        } catch (error) {
            console.error("Services front-end error:", error);
        }
    };

    useEffect(() => {
        userAuthentication();
        getServices(page, limit);
    }, [page, limit]);


    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                setUser,
                userAuthentication,
                services,
                isLoading,
                page,
                totalPages,
                setTotalPages,
                setPage,
                limit,
                setLimit,
                getServices,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};


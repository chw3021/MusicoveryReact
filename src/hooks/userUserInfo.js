import { useState, useEffect } from "react";

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('MUSICOVERY_USER');
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
        }
    }, []);

    return userInfo;
};

export default useUserInfo;
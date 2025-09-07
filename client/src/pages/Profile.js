import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../features/auth/authSlice";
import LogoutButton from "../components/LogOutButton.js";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const status = useSelector((state) => state.auth.loading);
    
    useEffect(() => {
        dispatch(fetchUserProfile()); // Fetch profile on mount
    }, [dispatch]);

    if (status) return <p>Loading profile...</p>;

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Total Links:</strong> {user?.totalLinks || 0}</p>
            <LogoutButton />
        </div>
    );
};

export default Profile;

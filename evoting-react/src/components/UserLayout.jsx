import { Outlet } from "react-router-dom";
import Navbar from "./UserNavbar";

const UserLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default UserLayout;

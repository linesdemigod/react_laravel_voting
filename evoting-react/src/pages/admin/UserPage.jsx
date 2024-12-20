import { useContext, useEffect } from "react";
import Spinner from "../../components/Spinner";
import UserItem from "../../components/UserItem";
import UserContext from "../../context/UserContext";
import { getUsers, deleteUser } from "../../context/UserAction";
import { Link } from "react-router-dom";

function UserPage() {
    const { users, loading, dispatch } = useContext(UserContext);

    useEffect(() => {
        dispatch({ type: "SET_LOADING" });
        const fetchUsers = async () => {
            const userData = await getUsers();
            dispatch({ type: "GET_USERS", payload: userData });
        };
        fetchUsers();
    }, [dispatch]);

    // delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to remove this?")) {
            console.log(id);
            const data = await deleteUser(id);
            dispatch({ type: "DELETE_USER", payload: id });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center font-bold text-base lg:text-3xl mb-5">
                List of users
            </h2>

            <Link
                to="/admin/create-user"
                className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded mb-5"
            >
                Create User
            </Link>
            <div className="shadow-sm  rounder-lg sm:mx-auto sm:w-full  w-full">
                {loading ? (
                    <Spinner />
                ) : users && users.length > 0 ? (
                    <div className="mt-5">
                        {/* create user button */}
                        {/* table start */}
                        <table className="w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-gray-500 text-white  align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Name
                                    </th>
                                    <th className="px-6 bg-gray-500 text-white  align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Email
                                    </th>
                                    <th className="px-6 bg-gray-500 text-white  align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Is Admin
                                    </th>
                                    <th className="px-6 bg-gray-500 text-white  align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Status
                                    </th>
                                    <th className="px-6 bg-gray-500 text-white  align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <UserItem
                                        key={user.id}
                                        user={user}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex mt-8 justify-center items-center">
                        <p className="font-semibold text-lg">No users found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserPage;

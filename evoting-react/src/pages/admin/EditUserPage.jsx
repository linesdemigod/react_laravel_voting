import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { getSingleUser, updateUser } from "../../context/UserAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

function EditUserPage() {
    const { loading, dispatch, message, user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        is_admin: 0,
        status: "",
    });

    const { name, email, password, is_admin, status } = formData;

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: "SET_LOADING" });
        const getUser = async () => {
            const userData = await getSingleUser(id);
            dispatch({
                type: "SHOW_USER",
                payload: userData,
            });
        };
        getUser();
    }, [id]);

    useEffect(() => {
        if (user) {
            setFormData({
                ...formData,
                ...user,
            });
        }
    }, [user]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === "" || email === "" || password === "" || is_admin === "") {
            toast.error("Fill all fields");
        } else {
            const data = await updateUser(id, formData);

            if (data.success) {
                dispatch({ type: "UPDATE_USER", payload: data });
                toast.success(data.message);
                navigate("/admin/users");
                //clear form
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    is_admin: 0,
                    status: "",
                });
            } else {
                toast.error(data.message);
            }
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container">
            <div className="flex flex-row justify-between items-center gap-5">
                <h1 className="text-3xl font-bold text-center">User</h1>

                <Link
                    className="text-primary hover:underline font-semibold"
                    to="/admin/users"
                >
                    Back
                </Link>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md">
                    <h1 className="mb-4 text-center text-2xl font-bold">
                        Create User
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="name"
                                id="name"
                                name="name"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                placeholder="Kwaku Ananse"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                placeholder="ananse@kwaku.com"
                                value={email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                placeholder="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="is_admin"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Role
                            </label>

                            <div className="flex items-center mb-4">
                                <input
                                    id="user"
                                    type="radio"
                                    name="is_admin"
                                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                    value={0}
                                    checked={is_admin === 0}
                                    // value={is_admin}
                                    onChange={(e) =>
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            is_admin: parseInt(e.target.value), // Convert value to number
                                        }))
                                    }
                                />
                                <label
                                    htmlFor="user"
                                    className="text-sm font-medium text-gray-900 ml-2 block"
                                >
                                    Voter
                                </label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input
                                    id="admin"
                                    type="radio"
                                    name="is_admin"
                                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                    value={1}
                                    checked={is_admin === 1}
                                    onChange={(e) =>
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            is_admin: parseInt(e.target.value),
                                        }))
                                    }
                                />
                                <label
                                    htmlFor="admin"
                                    className="text-sm font-medium text-gray-900 ml-2 block"
                                >
                                    Admin
                                </label>
                            </div>

                            {/* <input
                                type="time"
                                name="is_admin"
                                id="is_admin"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                value={is_admin}
                                onChange={onChange}
                            /> */}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="status"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>
                            <select
                                name="status"
                                id="status"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                value={status}
                                onChange={onChange}
                            >
                                <option value="">Select Status</option>
                                <option value="0">Not Voted</option>
                                <option value="1">Voted</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            name="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUserPage;

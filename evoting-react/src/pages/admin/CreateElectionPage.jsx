import { useContext, useState } from "react";
import ElectionContext from "../../context/ElectionContext";
import { createElection } from "../../context/ElectionAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CreateElectionPage() {
    const { loading, dispatch, message } = useContext(ElectionContext);
    const [formData, setFormData] = useState({
        name: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        status: "",
    });

    const { name, start_date, end_date, start_time, end_time, status } =
        formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            name === "" ||
            start_date === "" ||
            end_date === "" ||
            start_time === "" ||
            end_time === ""
        ) {
            toast.error("Fill all fields");
        } else {
            const data = await createElection(formData);

            if (data.success) {
                dispatch({ type: "CREATE_ELECTION", payload: data });
                toast.success(data.message);
                //clear form
                setFormData({
                    name: "",
                    start_date: "",
                    end_date: "",
                    start_time: "",
                    end_time: "",
                    status: "",
                });
            } else {
                toast.error(data.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="flex flex-row justify-between items-center gap-5">
                <h1 className="text-3xl font-bold text-center">Election</h1>

                <Link
                    className="text-primary hover:underline font-semibold"
                    to="/admin/elections"
                >
                    Back
                </Link>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md">
                    <h1 className="mb-4 text-center text-2xl font-bold">
                        Create Election
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
                                placeholder="election type"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="start_date"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                id="start_date"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                value={start_date}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="end_date"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                End Date
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                id="end_date"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                value={end_date}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="start_time"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Start Time
                            </label>
                            <input
                                type="time"
                                name="start_time"
                                id="start_time"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                value={start_time}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="end_time"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                End time
                            </label>
                            <input
                                type="time"
                                name="end_time"
                                id="end_time"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                value={end_time}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="status"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>
                            <input
                                type="text"
                                name="status"
                                id="status"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                value={status}
                                onChange={onChange}
                            />
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

export default CreateElectionPage;

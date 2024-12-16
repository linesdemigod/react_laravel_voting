import { useContext, useEffect } from "react";
import Spinner from "../../components/Spinner";
import ElectionItem from "../../components/ElectionItem";
import ElectionContext from "../../context/ElectionContext";
import { getElections, deleteElection } from "../../context/ElectionAction";
import { Link } from "react-router-dom";

function ElectionPage() {
    const { elections, loading, dispatch } = useContext(ElectionContext);

    useEffect(() => {
        dispatch({ type: "SET_LOADING" });
        const fetchElections = async () => {
            const electionData = await getElections();
            dispatch({ type: "GET_ELECTIONS", payload: electionData });
        };
        fetchElections();
    }, [dispatch]);

    // delete election
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to remove this?")) {
            console.log(id);
            const data = await deleteElection(id);
            dispatch({ type: "DELETE_ELECTION", payload: id });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center font-bold text-base lg:text-3xl mb-5">
                List of elections
            </h2>

            <Link
                to="/admin/create-election"
                className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded mb-5"
            >
                Create Election
            </Link>
            <div className="shadow-sm  rounder-lg sm:mx-auto sm:w-full  w-full">
                {loading ? (
                    <Spinner />
                ) : elections && elections.length > 0 ? (
                    <div className="mt-5">
                        {/* create election button */}
                        {/* table start */}
                        <table className="w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-gray-500 text-white  align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Name
                                    </th>
                                    <th className="px-6 bg-gray-500 text-white  align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Start Date
                                    </th>
                                    <th className="px-6 bg-gray-500 text-white  align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        End Date
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
                                {elections.map((election) => (
                                    <ElectionItem
                                        key={election.id}
                                        election={election}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex mt-8 justify-center items-center">
                        <p className="font-semibold text-lg">
                            No elections found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ElectionPage;

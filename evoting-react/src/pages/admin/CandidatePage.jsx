import { useContext, useEffect } from "react";
import Spinner from "../../components/Spinner";
import CandidateItem from "../../components/CandidateItem";
import CandidateContext from "../../context/CandidateContext";
import { getCandidates, deleteCandidate } from "../../context/CandidateAction";
import { Link } from "react-router-dom";

function CandidatePage() {
    const { candidates, loading, dispatch } = useContext(CandidateContext);

    useEffect(() => {
        dispatch({ type: "SET_LOADING" });
        const fetchCandidates = async () => {
            const candidateData = await getCandidates();
            dispatch({ type: "GET_CANDIDATES", payload: candidateData });
        };
        fetchCandidates();
    }, [dispatch]);

    // delete candidate
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to remove this?")) {
            console.log(id);
            const data = await deleteCandidate(id);
            dispatch({ type: "DELETE_CANDIDATE", payload: id });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center font-bold text-base lg:text-3xl mb-5">
                List of Candidates
            </h2>

            <Link
                to="/admin/create-candidate"
                className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded mb-5"
            >
                Create Candidate
            </Link>
            <div className=" rounder-lg sm:mx-auto sm:w-full  w-full">
                {loading ? (
                    <Spinner />
                ) : candidates && candidates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-5">
                        {candidates.map((candidate) => (
                            <CandidateItem
                                key={candidate.id}
                                candidate={candidate}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex mt-8 justify-center items-center">
                        <p className="font-semibold text-lg">
                            No candidates found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CandidatePage;

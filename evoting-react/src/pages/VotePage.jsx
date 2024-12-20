import { useContext, useEffect } from "react";
import Spinner from "../components/Spinner";
import CandidateContext from "../context/CandidateContext";
import { getElectionCandidates } from "../context/CandidateAction";
import { useParams } from "react-router-dom";
import VoteCard from "../components/VoteCard";

function VotePage() {
    const { loading, dispatch, votedCandidate, candidates } =
        useContext(CandidateContext);

    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: "SET_LOADING" });
        const getCandidates = async () => {
            const candidateData = await getElectionCandidates(id);
            dispatch({
                type: "SHOW_CANDIDATES",
                payload: candidateData,
            });
        };
        getCandidates();
    }, [id]);

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="container">
            {candidates && candidates.length > 0 ? (
                <div className="">
                    <h1 className="mt-5 font-bold text-4xl">
                        {candidates[0].election.name} Election
                    </h1>

                    <div className="mt-5">
                        {votedCandidate ? (
                            <p
                                key={votedCandidate.candidate.id}
                                className=" text-lg"
                            >
                                You have voted for:{" "}
                                <span className="font-semibold">
                                    {votedCandidate.candidate.name}
                                </span>
                            </p>
                        ) : (
                            <p> You haven't voted yet</p>
                        )}
                    </div>
                    <div className="mt-10">
                        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                            {candidates.map((candidate) => (
                                <VoteCard
                                    key={candidate.id}
                                    candidate={candidate}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="">
                    <h1 className="text-3xl font-bold text-center mt-10">
                        No Candidates
                    </h1>
                </div>
            )}
        </div>
    );
}

export default VotePage;

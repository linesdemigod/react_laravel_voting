import { echoInstance } from "../../context/Reverb";
import { useContext, useEffect } from "react";
import Spinner from "../../components/Spinner";
import ElectionContext from "../../context/ElectionContext";
import { getElectionResult } from "../../context/ElectionAction";
import { useParams } from "react-router-dom";
import ResultItem from "../../components/ResultItem";

function ElectionResultPage() {
    const { voteCount, candidateVotes, election, loading, dispatch } =
        useContext(ElectionContext);
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: "SET_LOADING" });
        const fetchElectionResult = async () => {
            const electionData = await getElectionResult(id);
            dispatch({ type: "ELECTION_RESULT", payload: electionData });
        };
        fetchElectionResult();
    }, [dispatch]);

    const resultChannel = `result.${election.id}`;

    useEffect(() => {
        const channel = echoInstance.channel(resultChannel);
        channel.listen("Voting", (event) => {
            const updatedVote = event.vote;

            dispatch({ type: "ELECTION_RESULT", payload: updatedVote });
            // dispatch({
            //     type: "UPDATE_ELECTION_RESULT",
            //     payload: { updatedVote, totalVotes: event.total_votes },
            // });
        });
    }, [resultChannel]);

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="container mt-8">
            <h1 className="text-2xl font-bold text-center mb-5">
                {election.name} Election
            </h1>
            <p className="text-lg font-bold text-center mb-8">
                Total Vote Count: {voteCount}
            </p>
            <div className="max-w-lg mx-auto">
                <div className="grid grid-cols-1 gap-5 ">
                    {candidateVotes && candidateVotes.length > 0 ? (
                        candidateVotes.map((vote) => (
                            <ResultItem
                                key={vote.id}
                                vote={vote}
                                voteCount={voteCount}
                                election={election}
                            />
                        ))
                    ) : (
                        <p className="font-semibold text-lg">
                            No results found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ElectionResultPage;

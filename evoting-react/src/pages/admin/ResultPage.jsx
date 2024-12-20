import { useContext, useEffect } from "react";
import Spinner from "../../components/Spinner";
import ElectionContext from "../../context/ElectionContext";
import { getElections } from "../../context/ElectionAction";
import Card from "../../components/Card";
import ElectionCard from "../../components/ElectionCard";

const ResultPage = () => {
    const { elections, loading, dispatch } = useContext(ElectionContext);

    useEffect(() => {
        dispatch({ type: "SET_LOADING" });
        const fetchElections = async () => {
            const electionData = await getElections();
            dispatch({ type: "GET_ELECTIONS", payload: electionData });
        };
        fetchElections();
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="mt-10 container">
                <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {elections.map((election) => (
                        <ElectionCard key={election.id} election={election} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ResultPage;

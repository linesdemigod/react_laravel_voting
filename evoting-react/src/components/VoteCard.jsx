import { useContext, useState } from "react";
import CandidateContext from "../context/CandidateContext";
import { voteCandidate } from "../context/CandidateAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VoteCard({ candidate }) {
    const { dispatch } = useContext(CandidateContext);
    const [formData, setFormData] = useState({
        candidate_id: candidate.id,
        election_id: candidate.election.id,
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.candidate_id || !formData.election_id) {
            toast.error("Fill all fields");
        } else {
            try {
                const data = await voteCandidate(formData);

                if (data.success) {
                    dispatch({ type: "VOTE_CANDIDATE", payload: data });
                    toast.success(data.message);
                    navigate("/user");
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    const imageUrl = import.meta.env.VITE_IMAGE_URL;
    const profile = `${imageUrl}/${candidate.profile}`;

    return (
        <div className="p-4 max-w-sm bg-white shadow-sm rounded-2xl hover:shadow-sm  flex flex-col items-center justify-center">
            <img
                src={profile}
                className="shadow rounded-lg overflow-hidden h-1/2 w-1/2"
                alt={candidate.name}
            />
            <div className="mt-8">
                <h4 className="font-bold text-xl">{candidate.name}</h4>
                <p className="mt-2 text-gray-500">{candidate.election.name}</p>
                <div className="mt-5">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="hidden"
                            name="candidate_id"
                            id="candidate_id"
                            value={formData.candidate_id}
                        />
                        <input
                            type="hidden"
                            name="election_id"
                            id="election_id"
                            value={formData.election_id}
                        />

                        <button
                            type="submit"
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
                        >
                            Vote
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VoteCard;

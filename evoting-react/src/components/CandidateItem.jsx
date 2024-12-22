import { Link, useNavigate } from "react-router-dom";

const CandidateItem = ({ candidate, handleDelete }) => {
    const imageUrl = import.meta.env.VITE_IMAGE_URL;
    const profile = `${imageUrl}/${candidate.profile}`;

    return (
        <div className="bg-white shadow-xl overflow-hidden hover:shadow-2xl rounded-xl py-4 px-4">
            <div className="flex items-center gap-4">
                <img
                    src={profile}
                    className="w-32 h-32 object-center object-cover rounded-full "
                    alt={candidate.name}
                />
                <div className="w-fit">
                    <h1 className="text-black font-bold">{candidate.name}</h1>
                    <p className="text-gray-500 text-sm">
                        {candidate.party ? candidate.party : "N/A"}
                    </p>
                    <a className="text-base text-gray-700 mb-2">
                        {candidate.election && candidate.election.name
                            ? candidate.election.name
                            : "N/A"}
                    </a>

                    <div className="flex gap-3 items-center flex-row mt-3">
                        <Link
                            className="py-2 px-4 text-white bg-gray-700 rounded-lg"
                            to={`/admin/edit-candidate/${candidate.id}`}
                        >
                            Edit
                        </Link>
                        <button
                            type="button"
                            className="py-2 px-4 text-white bg-danger rounded-lg"
                            onClick={() => handleDelete(candidate.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateItem;

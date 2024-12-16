import { useContext, useState, useEffect } from "react";
import ElectionContext from "../../context/ElectionContext";
import { getElections } from "../../context/ElectionAction";
import CandidateContext from "../../context/CandidateContext";
import { createCandidate } from "../../context/CandidateAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CreateCandidatePage() {
    const {
        loading,
        elections,
        dispatch: electionDispatch,
    } = useContext(ElectionContext);

    const { candidate, dispatch: candidateDispatch } =
        useContext(CandidateContext);

    const [formData, setFormData] = useState({
        name: "",
        party_id: "",
        election_id: "",
        profile: {},
    });

    useEffect(() => {
        electionDispatch({ type: "SET_LOADING" });
        const fetchElections = async () => {
            const electionData = await getElections();
            electionDispatch({ type: "GET_ELECTIONS", payload: electionData });
        };
        fetchElections();
    }, [electionDispatch]);

    const { name, party_id, election_id, profile } = formData;

    const onChange = async (e) => {
        if (e.target.id === "profile" && e.target.files.length > 0) {
            setFormData((prevState) => ({
                ...prevState,
                profile: e.target.files[0],
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === "" || election_id === "" || profile === "") {
            toast.error("Fill all fields");
        } else {
            const data = await createCandidate(formData);

            if (data.success) {
                candidateDispatch({ type: "CREATE_CANDIDATE", payload: data });
                toast.success(data.message);
                //clear form
                setFormData({
                    name: "",
                    party_id: "",
                    election_id: "",
                    profile: "",
                });
            } else {
                toast.error(data.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="flex flex-row justify-between items-center gap-5">
                <h1 className="text-3xl font-bold text-center">Candidate</h1>

                <Link
                    className="text-primary hover:underline font-semibold"
                    to="/admin/candidates"
                >
                    Back
                </Link>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md">
                    <h1 className="mb-4 text-center text-2xl font-bold">
                        Create Candidate
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
                                placeholder="Candidate Name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="party_id"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Party
                            </label>
                            <input
                                type="text"
                                name="party_id"
                                id="party_id"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                value={party_id}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="end_date"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Election Type
                            </label>
                            <select
                                name=""
                                id="election_id"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                value={election_id}
                                onChange={onChange}
                            >
                                <option value="">Select Election Type</option>
                                {elections.map((election) => (
                                    <option
                                        key={election.id}
                                        value={election.id}
                                    >
                                        {election.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="start_time"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Profile
                            </label>
                            <input
                                type="file"
                                name="profile"
                                id="profile"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                accept=".jpg,.png,.jpeg"
                                // value={profile}
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

export default CreateCandidatePage;

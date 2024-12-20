import { Link } from "react-router-dom";
function ElectionCard({ election }) {
    return (
        <div className="p-8 max-w-lg bg-white shadow-sm rounded-2xl hover:shadow-sm flex flex-col items-center">
            <h4 className="font-semibold text-xl">
                {election.name} Election Result
            </h4>
            {/* <p className="mt-2 text-gray-700 text-center">
                Click on the show button to display the candidates for this
                election
            </p> */}
            <div className="mt-5">
                <Link
                    to={`/admin/result/${election.id}`}
                    className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary"
                >
                    View Result
                </Link>
            </div>
        </div>
    );
}

export default ElectionCard;

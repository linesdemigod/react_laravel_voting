import { Link, useNavigate } from "react-router-dom";

const ElectionItem = ({ election, handleDelete }) => {
    return (
        <tr>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                {election.name}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                {election.start_date} {election.start_time}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                {election.end_date} {election.end_time}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                {election.status === null ? "N/A" : election.status}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                <div className="flex justify-between gap-3 items-center flex-row">
                    <Link
                        className="py-2 px-4 text-white bg-gray-700 rounded-lg"
                        to={`/admin/edit-election/${election.id}`}
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="py-2 px-4 text-white bg-danger rounded-lg"
                        onClick={() => handleDelete(election.id)}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ElectionItem;

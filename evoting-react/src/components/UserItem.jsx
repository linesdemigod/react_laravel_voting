import { Link, useNavigate } from "react-router-dom";

function UserItem({ user, handleDelete }) {
    return (
        <tr>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                {user.name}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                {user.email}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                {user.is_admin === 0 ? "Voter" : "Admin"}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                {user.status === 1 ? "Voted" : "Not Voted"}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left ">
                <div className="flex justify-between gap-3 items-center flex-row">
                    <Link
                        className="py-2 px-4 text-white bg-gray-700 rounded-lg"
                        to={`/admin/edit-user/${user.id}`}
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="py-2 px-4 text-white bg-danger rounded-lg"
                        onClick={() => handleDelete(user.id)}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default UserItem;

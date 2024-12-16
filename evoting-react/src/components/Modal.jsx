import { useState } from "react";

function Modal({ show }) {
    const [toggle, setToggle] = useState(false);
    const toggleModal = () => {
        setToggle(!toggle);
    };
    console.log(show);

    return (
        <div
            id="modal"
            className={`${toggle ? "block" : "hidden"} ${
                show ? "block" : "hidden"
            } modal-container fixed inset-0 flex  items-center justify-center`}
        >
            <div className="w-full rounded-lg bg-white p-6 shadow-lg sm:w-full md:max-w-[30%] lg:max-w-[30%] xl:max-w-[30%]">
                {/* <!-- Modal Header --> */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Update Post</h2>
                    <button
                        type="button"
                        className="text-black hover:text-red-700"
                        onClick={() => toggleModal}
                    >
                        &times;
                    </button>
                </div>

                {/* <!-- Modal Body --> */}
                <div className="mb-6">
                    <form>
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
                                placeholder="election type"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="start_date"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                id="start_date"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="end_date"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                End Date
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                id="end_date"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="status"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>
                            <input
                                type="text"
                                name="status"
                                id="status"
                                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
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

export default Modal;

const Sidebar = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 text-lg font-bold border-b border-gray-700">
                    Admin Dashboard
                </div>
                <nav className="flex-1 p-4">
                    <ul>
                        <li className="mb-4">
                            <a
                                href="#"
                                className="flex items-center p-2 rounded-md hover:bg-gray-700"
                            >
                                <span className="ml-2">Dashboard</span>
                            </a>
                        </li>
                        <li className="mb-4">
                            <a
                                href="#"
                                className="flex items-center p-2 rounded-md hover:bg-gray-700"
                            >
                                <span className="ml-2">Users</span>
                            </a>
                        </li>
                        <li className="mb-4">
                            <a
                                href="#"
                                className="flex items-center p-2 rounded-md hover:bg-gray-700"
                            >
                                <span className="ml-2">Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-white shadow-sm px-4 py-2 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Welcome, Admin</h1>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                            Profile
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Cards */}
                        <div className="bg-white p-4 shadow rounded-md">
                            <h2 className="text-lg font-semibold">Users</h2>
                            <p className="text-gray-600 mt-2">1,234</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded-md">
                            <h2 className="text-lg font-semibold">Revenue</h2>
                            <p className="text-gray-600 mt-2">$12,345</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded-md">
                            <h2 className="text-lg font-semibold">
                                Performance
                            </h2>
                            <p className="text-gray-600 mt-2">92%</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Sidebar;

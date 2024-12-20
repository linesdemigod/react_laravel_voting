import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import { UserProvider } from "./context/UserContext";
import { CandidateProvider } from "./context/CandidateContext";
import { ElectionProvider } from "./context/ElectionContext";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import VotingPage from "./pages/VotingPage";
import AdminPage from "./pages/admin/AdminPage";
import CandidatePage from "./pages/admin/CandidatePage";
import ElectionPage from "./pages/admin/ElectionPage";
import CreateElectionPage from "./pages/admin/CreateElectionPage";
import EditElectionPage from "./pages/admin/EditElectionPage";
import CreateCandidatePage from "./pages/admin/CreateCandidatePage";
import EditCandidatePage from "./pages/admin/EditCandidatePage";
import UserPage from "./pages/admin/UserPage";
import CreateUserPage from "./pages/admin/CreateUserPage";
import EditUserPage from "./pages/admin/EditUserPage";
import ResultPage from "./pages/admin/ResultPage";
import ElectionResultPage from "./pages/admin/ElectionResultPage";
import VotePage from "./pages/VotePage";

function App() {
    return (
        <>
            <AuthProvider>
                <ElectionProvider>
                    <CandidateProvider>
                        <UserProvider>
                            <Router>
                                <Routes>
                                    {/* Public Routes */}
                                    <Route
                                        index
                                        path="/"
                                        element={<HomePage />}
                                    />

                                    {/* Protected User Routes */}
                                    <Route element={<PrivateRoute role="0" />}>
                                        <Route
                                            path="/user"
                                            element={<UserLayout />}
                                        >
                                            <Route
                                                index
                                                element={<VotingPage />}
                                            />
                                            <Route
                                                path="election/:id"
                                                element={<VotePage />}
                                            />
                                        </Route>
                                    </Route>

                                    {/* Protected Admin Routes */}
                                    <Route element={<PrivateRoute role="1" />}>
                                        <Route
                                            path="/admin/*"
                                            element={
                                                <AdminLayout
                                                    element={<AdminLayout />}
                                                />
                                            }
                                        >
                                            <Route
                                                index
                                                element={<AdminPage />}
                                            />
                                            <Route
                                                path="candidates"
                                                element={<CandidatePage />}
                                            />
                                            <Route
                                                path="elections"
                                                element={<ElectionPage />}
                                            />
                                            <Route
                                                path="create-election"
                                                element={<CreateElectionPage />}
                                            />
                                            <Route
                                                path="edit-election/:id"
                                                element={<EditElectionPage />}
                                            />
                                            <Route
                                                path="create-candidate"
                                                element={
                                                    <CreateCandidatePage />
                                                }
                                            />
                                            <Route
                                                path="edit-candidate/:id"
                                                element={<EditCandidatePage />}
                                            />
                                            {/* users route */}
                                            <Route
                                                path="users"
                                                element={<UserPage />}
                                            />
                                            <Route
                                                path="create-user"
                                                element={<CreateUserPage />}
                                            />
                                            <Route
                                                path="edit-user/:id"
                                                element={<EditUserPage />}
                                            />
                                            <Route
                                                path="result"
                                                element={<ResultPage />}
                                            />
                                            <Route
                                                path="result/:id"
                                                element={<ElectionResultPage />}
                                            />
                                        </Route>
                                    </Route>
                                </Routes>
                            </Router>
                            <ToastContainer />
                        </UserProvider>
                    </CandidateProvider>
                </ElectionProvider>
            </AuthProvider>
        </>
    );
}

export default App;

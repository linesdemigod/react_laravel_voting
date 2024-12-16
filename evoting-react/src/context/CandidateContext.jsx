import { createContext, useReducer } from "react";
import CandidateReducer from "./CandidateReducer";
// import http from "./VotingAction";

const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
    const initialState = {
        error: false,
        message: "",
        success: false,
        candidates: [],
        candidate: {},
        loading: false,
    };

    const [state, dispatch] = useReducer(CandidateReducer, initialState);

    return (
        <CandidateContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </CandidateContext.Provider>
    );
};

export default CandidateContext;

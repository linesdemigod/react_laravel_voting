import { createContext, useReducer } from "react";
import ElectionReducer from "./ElectionReducer";
// import http from "./VotingAction";

const ElectionContext = createContext();

export const ElectionProvider = ({ children }) => {
    const initialState = {
        error: false,
        message: "",
        success: false,
        elections: [],
        election: {},
        loading: false,
    };

    const [state, dispatch] = useReducer(ElectionReducer, initialState);

    return (
        <ElectionContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </ElectionContext.Provider>
    );
};

export default ElectionContext;

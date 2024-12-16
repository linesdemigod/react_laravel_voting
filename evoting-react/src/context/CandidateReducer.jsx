const candidateReducer = (state, action) => {
    switch (action.type) {
        case "GET_CANDIDATES":
            return {
                ...state,
                candidates: action.payload.candidates,
                loading: false,
            };
        case "CREATE_CANDIDATE":
            return {
                ...state,
                candidate: action.payload.candidate,
                loading: false,
            };
        case "SHOW_CANDIDATE":
            return {
                ...state,
                candidate: action.payload.candidate,
                loading: false,
            };
        case "UPDATE_CANDIDATE":
            return {
                ...state,
                candidate: action.payload.candidate,
                loading: false,
            };
        case "DELETE_CANDIDATE":
            let updateCandidates = state.candidates.filter(
                (candidate) => candidate.id !== action.payload
            );
            return {
                ...state,
                candidates: updateCandidates,
                loading: false,
            };

        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "ERROR":
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default candidateReducer;

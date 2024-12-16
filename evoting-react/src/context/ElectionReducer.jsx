const electionReducer = (state, action) => {
    switch (action.type) {
        case "GET_ELECTIONS":
            return {
                ...state,
                elections: action.payload.elections,
                loading: false,
            };
        case "CREATE_ELECTION":
            return {
                ...state,
                election: action.payload.election,
                loading: false,
            };
        case "SHOW_ELECTION":
            return {
                ...state,
                election: action.payload.election,
                loading: false,
            };
        case "UPDATE_ELECTION":
            return {
                ...state,
                election: action.payload.election,
                loading: false,
            };
        case "DELETE_ELECTION":
            let updateElections = state.elections.filter(
                (election) => election.id !== action.payload
            );
            return {
                ...state,
                elections: updateElections,
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

export default electionReducer;

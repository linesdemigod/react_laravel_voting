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
        case "ELECTION_RESULT":
            return {
                ...state,
                voteCount: action.payload.voteCount,
                candidateVotes: action.payload.candidateVotes,
                election: action.payload.election,
                loading: false,
            };
        case "UPDATE_ELECTION_RESULT": {
            const { updatedVote, totalVotes } = action.payload;

            // Update the specific candidate's votes
            const updatedCandidates = state.candidateVotes.map((candidate) =>
                candidate.id === updatedVote.candidate_id
                    ? { ...candidate, ...updatedVote } // Update the matching candidate
                    : candidate
            );

            return {
                ...state,
                voteCount: totalVotes ?? state.voteCount, // Use updated total votes if provided, otherwise keep current
                candidateVotes: updatedCandidates, // Update the candidate votes list
            };
        }

        case "UPDATE_VOTE":
            const updatedVotes = state.candidateVotes.map((vote) =>
                vote.candidate_id === action.payload.candidate_id
                    ? { ...vote, ...action.payload }
                    : vote
            );
            const totalVoteCount = updatedVotes.reduce(
                (sum, v) => sum + v.votes_count,
                0
            );

            return {
                ...state,
                candidateVotes: updatedVotes,
                voteCount: totalVoteCount,
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

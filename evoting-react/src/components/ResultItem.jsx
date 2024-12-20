function ResultItem({ vote, voteCount, election }) {
    const imageUrl = import.meta.env.VITE_IMAGE_URL;
    const profile = vote?.profile
        ? `${imageUrl}/${vote.profile}`
        : "/placeholder.jpg";

    // Calculate percentage safely
    const percentage =
        voteCount > 0
            ? (Number(vote.votes_count) / Number(voteCount)) * 100
            : 0;

    return (
        <div className="w-full bg-white shadow-lg rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
                <div className="basis-1/3">
                    <img
                        className="w-16 h-16 rounded-full border-2 border-blue-500"
                        src={profile}
                        alt={vote.name}
                    />
                </div>
                <div className="basis-2/3">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {vote.name || "Unknown Candidate"}
                        </h2>
                        <p className="text-sm text-gray-500">Candidate</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Votes Received: {`${percentage.toFixed(2)}%`}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-blue-500 h-4 rounded-full"
                                style={{
                                    width: `${percentage}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">
                            Total Votes:{" "}
                            <span className="font-medium text-gray-800">
                                {vote.votes_count || 0}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultItem;

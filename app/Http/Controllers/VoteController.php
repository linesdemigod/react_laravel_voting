<?php

namespace App\Http\Controllers;

use App\Events\Voting;
use App\Models\Vote;
use App\Models\Election;
use App\Models\Candidate;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    //candidates involved that elections

    //set user votes
    // function setVote(Request $request)
    // {
    //     // Validate the input data
    //     $validate = $request->validate([
    //         'candidate_id' => 'required|integer|exists:candidates,id',
    //         'election_id' => 'required|integer|exists:elections,id',
    //     ]);

    //     $validate['user_id'] = auth()->id();

    //     // Retrieve the election details
    //     $election = Election::find($validate['election_id']);

    //     if (!$election) {
    //         return response()->json([
    //             'message' => 'Election not found.',
    //         ], 404);
    //     }

    //     $now = now();

    //     // Check if voting has not started yet
    //     $startDateTime = "{$election->start_date} {$election->start_time}";
    //     if ($now->lt($startDateTime)) {
    //         return response()->json([
    //             'message' => 'Voting has not started yet.',
    //         ], 400);
    //     }

    //     // Check if voting has already ended
    //     $endDateTime = "{$election->end_date} {$election->end_time}";
    //     if ($now->gt($endDateTime)) {
    //         return response()->json([
    //             'message' => 'Voting has ended.',
    //         ], 400);
    //     }

    //     // Check if the user has already voted in this election
    //     $hasVoted = Vote::where('user_id', $validate['user_id'])
    //         ->where('election_id', $validate['election_id'])
    //         ->exists();

    //     if ($hasVoted) {
    //         return response()->json([
    //             'message' => 'You have already voted in this election.',
    //         ], 400);
    //     }

    //     // Save the vote
    //     $vote = Vote::create($validate);

    //     // Broadcast voting event
    //     broadcast(new Voting($vote))->toOthers();

    //     return response()->json([
    //         'message' => 'Vote set successfully.',
    //     ], 200);
    // }

    public function setVote(Request $request)
    {
        // Validate the input data
        $validate = $request->validate([
            'candidate_id' => 'required|integer|exists:candidates,id',
            'election_id' => 'required|integer|exists:elections,id',
        ]);

        $validate['user_id'] = auth()->id();

        // Retrieve the election details
        $election = Election::find($validate['election_id']);

        if (!$election) {
            return response()->json([
                'message' => 'Election not found.',
            ], 404);
        }

        $now = now();

        // Check if voting has not started yet
        $startDateTime = "{$election->start_date} {$election->start_time}";
        if ($now->lt($startDateTime)) {
            return response()->json([
                'message' => 'Voting has not started yet.',
            ], 400);
        }

        // Check if voting has already ended
        $endDateTime = "{$election->end_date} {$election->end_time}";
        if ($now->gt($endDateTime)) {
            return response()->json([
                'message' => 'Voting has ended.',
            ], 400);
        }

        // Check if the user has already voted in this election
        $hasVoted = Vote::where('user_id', $validate['user_id'])
            ->where('election_id', $validate['election_id'])
            ->exists();

        if ($hasVoted) {
            return response()->json([
                'message' => 'You have already voted in this election.',
            ], 400);
        }

        // Save the vote
        $vote = Vote::create($validate);

        // Recalculate total votes for the election
        // $totalVotes = Vote::where('election_id', $validate['election_id'])->count();

        // // Recalculate the candidate's vote count
        // $candidateVotesCount = Vote::where('candidate_id', $validate['candidate_id'])
        //     ->where('election_id', $validate['election_id'])
        //     ->count();

        $electionId = $validate['election_id'];

        // Get total vote count in a single query
        $voteCount = Vote::where('election_id', $electionId)->count();

        // Get candidates with their vote counts
        $candidateVotes = Candidate::withCount([
            'votes' => function ($query) use ($electionId) {
                $query->where('election_id', $electionId);
            }
        ])
            ->where('election_id', $electionId)
            ->get(['id', 'name', 'election_id']);

        // Prepare data to broadcast
        // $broadcastData = [
        //     'vote' => [
        //         'id' => $vote->id,
        //         'candidate_id' => $vote->candidate_id,
        //         'election_id' => $vote->election_id,
        //         'user_id' => $vote->user_id,
        //         'votes_count' => $candidateVotesCount,
        //         'created_at' => $vote->created_at,
        //         'updated_at' => $vote->updated_at,
        //     ],
        //     'total_votes' => $totalVotes,
        // ];

        $broadcastData = [
            'vote' => [
                'election_id' => $vote->election_id,
                'voteCount' => $voteCount,
                'candidateVotes' => $candidateVotes,
                'election' => $election
            ]
        ];

        // Broadcast voting event
        broadcast(new Voting($broadcastData))->toOthers();



        return response()->json([
            'message' => 'Vote set successfully.',
            'data' => $broadcastData,
        ], 200);
    }

    function result($id)
    {
        // Validate if the election exists
        $election = Election::find($id);

        if (!$election) {
            return response()->json(['error' => 'Election not found'], 404);
        }

        // Get total vote count in a single query
        $voteCount = Vote::where('election_id', $id)->count();

        // Get candidates with their vote counts
        $candidateVotes = Candidate::withCount([
            'votes' => function ($query) use ($id) {
                $query->where('election_id', $id);
            }
        ])
            ->where('election_id', $id)
            ->get(['id', 'name', 'election_id']);


        return response()->json([
            'voteCount' => $voteCount,
            'candidateVotes' => $candidateVotes,
            'election' => $election
        ], 200);
    }
}

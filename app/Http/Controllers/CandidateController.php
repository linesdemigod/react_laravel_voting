<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{

    function index()
    {

        $candidates = Candidate::with('election', 'party')
            ->latest()
            ->get();

        return response()->json([
            'candidates' => $candidates,
        ], 200);
    }

    function show(Candidate $candidate)
    {


        return response()->json([
            'candidate' => $candidate,
        ], 200);
    }

    function electionCandidates($id)
    {



        $candidates = Candidate::with('election')
            ->where('election_id', $id)
            ->latest()
            ->get();

        //get the candidate the user has voted for this election if any
        $voted = Vote::with('candidate')
            ->where('election_id', $id)
            ->where('user_id', auth()->id())
            ->first();

        return response()->json([
            'candidates' => $candidates,
            'votedCandidate' => $voted,
        ], 200);
    }


    function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required',
            'election_id' => 'required|exists:elections,id',
            'party' => 'nullable|sometimes',
            'profile' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg,webp'

            ],
        ], );

        if ($request->hasFile('profile')) {
            $validated['profile'] = $request->file('profile')->store('profile', 'public');
        }

        $candidate = Candidate::create($validated);

        return response()->json([
            'candidate' => $candidate,
            'message' => 'created successfully'
        ], 200);

    }

    function update(Candidate $candidate, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'election_id' => 'required|exists:elections,id',
            'party' => 'nullable|sometimes',
            'profile' => [

                'image',
                'mimes:jpeg,png,jpg,webp'

            ],
        ]);

        $oldImagePath = $candidate->profile;

        //upload file
        if ($request->hasFile('profile')) {
            $validated['profile'] = $request->file('profile')->store('profile', 'public');

            // Delete the old avatar if it exists
            if ($oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        $candidate->update($validated);

        return response()->json([
            'candidate' => $candidate,
            'message' => 'updated successfully'
        ], 200);
    }

    function destroy(Request $request, Candidate $candidate)
    {
        $oldImagePath = $candidate->profile;

        $candidate->delete();

        // Delete the old avatar if it exists
        if ($oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
            Storage::disk('public')->delete($oldImagePath);
        }



        return response()->json([
            'message' => 'deleted successfully'
        ], 200);
    }
}

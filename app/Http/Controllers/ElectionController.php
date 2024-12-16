<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Illuminate\Http\Request;

class ElectionController extends Controller
{
    function index()
    {

        $elections = Election::latest()
            ->get();

        return response()->json([
            'elections' => $elections,
        ], 200);
    }

    function show(Election $election)
    {


        return response()->json([
            'election' => $election,
        ], 200);
    }

    function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'status' => 'nullable|sometimes|string'
        ]);

        $election = Election::create($validated);

        return response()->json([
            'election' => $election,
            'message' => 'created successfully'
        ], 200);

    }

    function update(Election $election, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'status' => 'nullable|sometimes|string'
        ]);

        $election->update($validated);

        return response()->json([
            'election' => $election,
            'message' => 'updated successfully'
        ], 200);
    }

    function destroy(Election $election)
    {

        $election->delete();

        return response()->json([
            'message' => 'deleted successfully'
        ], 200);
    }
}

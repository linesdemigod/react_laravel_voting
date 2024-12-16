<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    function index()
    {

        $users = User::latest()
            ->get();

        return response()->json([
            'users' => $users,
        ], 200);
    }

    function show(User $user)
    {


        return response()->json([
            'user' => $user,
        ], 200);
    }

    function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required',
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'required|confirmed|min:6',
            'is_admin' => 'nullable|sometimes|boolean',
            'status' => 'nullable|sometimes|boolean'
        ]);

        $user = User::create($validated);

        return response()->json([
            'user' => $user,
            'message' => 'created successfully'
        ], 200);

    }

    function update(User $user, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'required|confirmed|min:6',
            'is_admin' => 'nullable|sometimes|boolean',
            'status' => 'nullable|sometimes|boolean'
        ]);

        $user->update($validated);

        return response()->json([
            'user' => $user,
            'message' => 'updated successfully'
        ], 200);
    }

    function destroy(User $user)
    {

        $user->delete();

        return response()->json([
            'message' => 'deleted successfully'
        ], 200);
    }
}

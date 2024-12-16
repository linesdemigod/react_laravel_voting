<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $formData = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $formData['email'])->first();

        if ($user && $user->status == 1) {
            return response([
                "message" => "You have already voted",
            ], 401);
        }


        // Attempt login
        if (!Auth::attempt($formData) || $user == null) {


            return response([
                "message" => "Invalid Credentials",
            ], 401);
        }

        // Successful login
        $user = Auth::user();

        // Return user and token
        return response([
            'user' => $user->only('name', 'email', 'is_admin'),
            'token' => $user->createToken('secret', ['*'], now()->addWeek())->plainTextToken,
            'message' => 'Login successfully'
        ], 200);

    }

    public function user()
    {

        return response([
            "user" => auth()->user(),
        ], 200);
    }

    function login_status()
    {
        //get the token



        //check if user is auth
        if (Auth::check()) {

            $user = auth()->user()->only('name', 'email', 'is_admin');


            return response()->json([
                'auth' => true,
                'user' => $user,
            ], 200);
        } else {
            return response()->json([
                'auth' => false,
            ], 401);
        }


    }

    public function logout()
    {
        $user = auth()->user();

        // Delete all tokens of the authenticated user
        $user->tokens()->delete();

        return response([
            "message" => "Logout successful",
        ], 200);

    }

}

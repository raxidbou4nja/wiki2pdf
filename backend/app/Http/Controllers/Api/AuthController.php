<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
// validator
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();
        
        if (! $user) {
            return response([
                'message' => 'invalidEmail'
            ], 200);
        }

        if (! \Hash::check($request->password, $user->password))
        {
            return response([
                'message' => 'invalidPassword'
            ], 200);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        if ($validation->fails()) {
            return response([
                'errors' => $validation->errors()
            ], 200);
        }

        $user = User::create([
            'name' => 'User-'. now()->timestamp,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('token')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ], 200);
    }
}

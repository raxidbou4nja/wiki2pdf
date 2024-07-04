<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;

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
            'user' => $user->only('id', 'name', 'email'),
            'roles' => $user->getRoleNames(),
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

        $role = Role::where('name', 'user')->first();
        $user->assignRole($role);


        $token = $user->createToken('token')->plainTextToken;

        return response([
            'user' => $user->only('id', 'name', 'email'),
            'roles' => $user->getRoleNames(),
            'token' => $token
        ], 200);
    }

    public function verifyToken(Request $request)
    {
        return response([
            'message' => 'validToken',
            'token' => $request->bearerToken(),
            'user' => $request->user()->only('id', 'name', 'email'),
            'roles' => $request->user()->getRoleNames()
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response([
            'message' => 'loggedOut'
        ], 200);
    }

    // update name and password if old password is correct
    public function updateProfile(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|min:4',
            'old_password' => 'required',
            'new_password' => 'required|min:6'
        ]);

        if ($validation->fails()) {
            return response([
            'errors' => $validation->errors()
            ], 200);
        }

        $user = $request->user();

        if (! \Hash::check($request->old_password, $user->password))
        {
            return response([
                'errors' => [
                    'old_password' => [
                        'invalid Old Password'
                    ]
                ]
            ], 200);
        }

        $user->update([
            'name' => $request->name,
            'password' => bcrypt($request->new_password)
        ]);

        return response([
            'user' => $user->only('id', 'name', 'email'),
            'success' => 'updated'
        ], 200);
    }
}

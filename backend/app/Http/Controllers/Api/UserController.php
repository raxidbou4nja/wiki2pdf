<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->page ?? 1;
        $search = $request->search ?? null;
        $limit = 25;
        $offset = ($page - 1) * $limit;

        $users = new User;

        if ($request->has('search')) 
        {
            $users = $users->where('title', 'like', '%'.$request->search.'%');
        }

        $total = $users->count();

        $users = $users->orderBy('id', 'desc')->offset($offset)->limit($limit)->get();

        if ($users->isEmpty()) 
        {
            return response()->json(['error' => 'No users Found']);
        }

        return response()->json(
            [
                'users' => UserResource::collection($users),
                'total' => $total,
                'limit' => $limit,
                'page' => $page,
            ]
        );
    }


    public function show($id)
    {
        return response()->json([
            'message' => 'show'
        ]);
    }

    public function destroy($id)
    {
        return response()->json([
            'message' => 'destroy'
        ]);
    }
}

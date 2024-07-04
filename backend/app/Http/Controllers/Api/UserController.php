<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $page = $request->page ?? 1;
        $search = $request->search ?? null;
        $limit = 5;
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
            return response()->json(['error' => 'No users Found'], 404);
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


    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $user = User::find($request->id);
        
        return response()->json([
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Destroy a user.
     *
     * @param int $id The ID of the user to be destroyed.
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json([
            'message' => 'destroy'
        ]);
    }
}

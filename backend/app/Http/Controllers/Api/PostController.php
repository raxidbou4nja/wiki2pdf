<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->page ?? 1;
        $search = $request->search ?? null;
        $limit = 5;
        $offset = ($page - 1) * $limit;

        $posts = new Post;

        if ($request->has('search')) 
        {
            $posts = $posts->where('title', 'like', '%'.$request->search.'%');
        }

        $total = $posts->count();

        $posts = $posts->orderBy('id', 'desc')->offset($offset)->limit($limit)->get();

        if ($posts->isEmpty()) 
        {
            return response()->json(['error' => 'No posts Found'], 404);
        }

        return response()->json(
            [
                'posts' => PostResource::collection($posts),
                'total' => $total,
                'limit' => $limit,
                'page' => $page,
            ]
        );
    }

    public function show(Request $request)
    {
        $post = Post::find($request->id);
        
        return response()->json([
            'post' => $post
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post = Post::create($request->all());

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post = Post::find($id);
        $post->update($request->all());

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post
        ]);
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ]);
    }

}

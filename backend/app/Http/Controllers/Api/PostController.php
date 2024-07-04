<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Http\Resources\PostResource;

class PostController extends Controller
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

        $posts = new Post;

        if ($request->has('search')) 
        {
            $posts = $posts->where('title', 'like', '%'.$request->search.'%');
        }
        
        $total = $posts->count();

        if (!auth()->user())
        {
            $posts = $posts->where('published', 1);
        }

        $posts = $posts->orderBy('id', 'desc')->offset($offset)->limit($limit)->select('id', 'title', 'image', 'content', 'created_at')->get();

        if ($posts->isEmpty()) 
        {
            return response()->json(['error' => 'No posts Found'], 404);
        }

        if (!auth()->user())
        {
            $posts = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'date' => strtotime($post->created_at),
                    'src' => public_path('images/'.$post->image),
                    'snippet' => 'Click to read more',
                    'content' => $post->content,
                ];
            });
        }

        return response()->json(
            [
                'posts' => $posts,
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
        $post = Post::find($request->id);
        
        return response()->json([
            'post' => new PostResource($post)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'title' => 'required',
            'content' => 'required',
            'published' => 'required'
        ]);

        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        

        $post = Post::create(
            [
                'title' => $request->title,
                'content' => $request->content,
                'image' => $imageName,
                'published' => $request->published
            ]
        );

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ]);
    }

    /**
     * Update a post.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        $request->validate([
            'id' => 'required|exists:posts,id',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'title' => 'required',
            'content' => 'required',
            'published' => 'required'
        ]);

        if ($request->hasFile('image')) 
        {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $request->image = $imageName;
        }


        $post = Post::find($request->id);
        $post->update(
            [
                'title' => $request->title,
                'content' => $request->content,
                'image' => $request->image ?? $post->image,
                'published' => $request->published
            ]
        );

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post
        ]);
    }

    /**
     * Destroy a post.
     *
     * @param int $id The ID of the post to be destroyed.
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ]);
    }

}

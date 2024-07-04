<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\SendMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OtherController extends Controller
{

    public function sendEmail(Request $request)
    {
        $request->validate([
            'message' => 'required',
        ]);

        $data = [
            'email' => 'official.wetyn@gmail.com',
            'subject' => 'New Message',
            'message' => $request->message,
        ];

        Mail::to($data['email'])->send(new SendMessage($data));

        return response()->json([
            'message' => 'Email sent successfully'
        ]);
    }
}
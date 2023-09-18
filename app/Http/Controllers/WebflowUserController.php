<?php

namespace App\Http\Controllers;

use App\Models\WebflowUser;
use Illuminate\Http\Request;

class WebflowUserController extends Controller
{
    public function newUser(Request $request)
    {
        WebflowUser::create([
            'email' => $request->get('email'),
            'name' => $request->get('name')
        ]);
    }
}

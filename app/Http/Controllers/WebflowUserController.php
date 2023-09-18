<?php

namespace App\Http\Controllers;

use App\Models\WebflowUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebflowUserController extends Controller
{
    public function data(Request $request)
    {
        $email = $request->get('email');

        try {
            $user = WebflowUser::where('email', $email)->firstOrFail();

            return $user->name ?? 'User';
        } catch (\Exception $exception) {
            Log::error('Get user data request recieved with invalid email', [
                'email' => $request->email
            ]);
        }

        return 'User';
    }

    public function newUser(Request $request)
    {
        WebflowUser::create([
            'email' => $request->get('email'),
            'name' => $request->get('name')
        ]);
    }
}

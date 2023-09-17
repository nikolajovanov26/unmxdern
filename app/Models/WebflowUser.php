<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebflowUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'webflow_id',
        'email',
        'last_login',
        'ip_address',
        'name'
    ];
}

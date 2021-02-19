<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    protected $table = 'adminboard';
    protected $guarded = ['id'];

    public static $rules = [
        'car_name' => 'required',
        'car_number' => 'required'
    ];
}

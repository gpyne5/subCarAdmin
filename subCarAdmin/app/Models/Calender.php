<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calender extends Model
{
    use HasFactory;
    protected $table = 'calender';
    protected $guarded = ['id'];

    public static $rules = [
        'y_m' => 'required',
        'car_id' => 'required'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public static $rules = [
        'car_name' => 'required',
        'car_number' => 'required'
    ];

    public function calenders() {
        return $this->hasMany('App\Models\Calender');
    }
}

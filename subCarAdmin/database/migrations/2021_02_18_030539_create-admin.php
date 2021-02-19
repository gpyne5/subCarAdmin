<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdmin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adminboard', function(Blueprint $table){
            $table->increments('id');
            $table->string('car_name');
            $table->string('car_number');
            $table->string('_1')->nullable();
            $table->string('_2')->nullable();
            $table->string('_3')->nullable();
            $table->string('_4')->nullable();
            $table->string('_5')->nullable();
            $table->string('_6')->nullable();
            $table->string('_7')->nullable();
            $table->string('_8')->nullable();
            $table->string('_9')->nullable();
            $table->string('_10')->nullable();
            $table->string('_11')->nullable();
            $table->string('_12')->nullable();
            $table->string('_13')->nullable();
            $table->string('_14')->nullable();
            $table->string('_15')->nullable();
            $table->string('_16')->nullable();
            $table->string('_17')->nullable();
            $table->string('_18')->nullable();
            $table->string('_19')->nullable();
            $table->string('_20')->nullable();
            $table->string('_21')->nullable();
            $table->string('_22')->nullable();
            $table->string('_23')->nullable();
            $table->string('_24')->nullable();
            $table->string('_25')->nullable();
            $table->string('_26')->nullable();
            $table->string('_27')->nullable();
            $table->string('_28')->nullable();
            $table->string('_29')->nullable();
            $table->string('_30')->nullable();
            $table->string('_31')->nullable();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}

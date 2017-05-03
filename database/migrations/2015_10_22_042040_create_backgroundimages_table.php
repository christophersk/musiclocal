<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBackgroundimagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('backgroundimages', function(Blueprint $table)
        {
            $table->increments('backgroundimage_id');
            $table->string('backgroundimage_uniqueid');
            $table->unsignedInteger('user_id')->nullable();
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('backgroundimages', function($table)
        {
            $table->dropForeign('backgroundimages_user_id_foreign');
        });

        Schema::drop('backgroundimages');
    }
}

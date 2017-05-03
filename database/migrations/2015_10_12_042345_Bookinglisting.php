<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Bookinglisting extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookinglistings', function(Blueprint $table)
		{
			$table->increments('bookinglisting_id');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->text('bookinglisting_title');
            $table->mediumText('bookinglisting_content');
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
        Schema::table('bookinglistings', function($table)
        {
            $table->dropForeign('bookinglistings_user_id_foreign');
        });

        Schema::drop('bookinglistings');
    }
}

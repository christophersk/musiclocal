<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventflyerUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{/*
        Schema::create('eventflyer_user', function(Blueprint $table)
        {
            $table->increments('eventflyer_user_id');
            $table->unsignedInteger('eventflyer_id');
            $table->unsignedInteger('user_id');
        });

        Schema::table('eventflyer_user', function( $table)
        {
            $table->foreign('eventflyer_id')->references('eventflyer_id')->on('eventflyers')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
*/
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{/*
        Schema::table('eventflyer_user', function($table)
        {
            $table->dropForeign('eventflyer_user_eventflyer_id_foreign');
            $table->dropForeign('eventflyer_user_user_id_foreign');
        });

        Schema::drop('eventflyer_user');
    */
	}

}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('event_user', function(Blueprint $table)
        {
            $table->increments('event_user_id');
            $table->unsignedInteger('event_id');
            $table->unsignedInteger('user_id');
            $table->tinyInteger('event_user_permission');
        });

        Schema::table('event_user', function( $table)
        {
            $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('event_user', function($table)
        {
            $table->dropForeign('event_user_event_id_foreign');
            $table->dropForeign('event_user_user_id_foreign');
        });

        Schema::drop('event_user');
	}

}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventflyersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('eventflyers', function(Blueprint $table)
        {
            $table->increments('eventflyer_id');
            $table->dateTime('eventflyer_start');
            $table->unsignedInteger('facebookphoto_id');
            $table->unsignedInteger('user_id');
            $table->SmallInteger('adjust_id')->unsigned();
            $table->timestamp('created_at');
        });

        Schema::table('eventflyers', function( $table)
        {
            $table->foreign('facebookphoto_id')->references('facebookphoto_id')->on('facebookphotos');
            $table->foreign('user_id')->references('user_id')->on('users');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
	    Schema::table('eventflyers', function($table)
        {
            $table->dropForeign('eventflyers_user_id_foreign');
            $table->dropForeign('eventflyers_facebookphoto_id_foreign');
        });

		Schema::drop('eventflyers');
	}

}

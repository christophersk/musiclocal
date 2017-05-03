<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('user_id');
			$table->string('user_first_name');
            $table->string('user_last_name');
			$table->string('user_email')->unique();
            $table->integer('user_location')->unsigned()->default('1');
            $table->unsignedBigInteger('facebook_user_id')->unique();
            $table->string('facebook_picture_url');
			$table->rememberToken();
			$table->timestamps();
            $table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}

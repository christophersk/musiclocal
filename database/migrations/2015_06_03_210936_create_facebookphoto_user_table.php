<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacebookphotoUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('facebookphoto_user', function(Blueprint $table)
		{
			$table->increments('facebookphoto_user_id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('facebookphoto_id');
			$table->timestamps();
            $table->softDeletes();
		});

        Schema::table('facebookphoto_user', function( $table)
        {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('facebookphoto_id')->references('facebookphoto_id')->on('facebookphotos')->onDelete('cascade');
        });
    }


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('facebookphoto_user', function($table)
        {
            $table->dropForeign('facebookphoto_user_user_id_foreign');
            $table->dropForeign('facebookphoto_user_facebookphoto_id_foreign');
        });

		Schema::drop('facebookphoto_user');
	}

}

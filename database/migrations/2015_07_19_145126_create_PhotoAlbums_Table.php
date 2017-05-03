<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhotoAlbumsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('photoalbums', function(Blueprint $table)
		{
			$table->increments('photoalbum_id');
            $table->string('photoalbum_name');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->boolean('photoalbum_active')->default(1);
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
		Schema::table('photoalbums', function($table)
        {
            $table->dropForeign('photoalbums_user_id_foreign');
        });

		Schema::drop('photoalbums');
	}

}

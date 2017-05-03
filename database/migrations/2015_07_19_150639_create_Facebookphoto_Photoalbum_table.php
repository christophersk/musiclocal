<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacebookphotoPhotoalbumTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('facebookphoto_photoalbum', function(Blueprint $table)
		{
			$table->increments('facebookphoto_photoalbum_id');
            $table->unsignedInteger('facebookphoto_id');
            $table->unsignedInteger('photoalbum_id');
			$table->timestamps();
		});

        Schema::table('facebookphoto_photoalbum', function( $table)
        {
            $table->foreign('photoalbum_id')->references('photoalbum_id')->on('photoalbums')->onDelete('cascade');
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
		Schema::table('facebookphoto_photoalbum', function($table)
        {
            $table->dropForeign('facebookphoto_photoalbum_facebookphoto_id_foreign');
			$table->dropForeign('facebookphoto_photoalbum_photoalbum_id_foreign');
        });

		Schema::drop('facebookphoto_photoalbum');
	}

}

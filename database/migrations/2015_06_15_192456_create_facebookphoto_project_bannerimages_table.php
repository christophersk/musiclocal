<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacebookphotoProjectBannerimagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        /*
        Schema::create('facebookphoto_project_bannerimages', function(Blueprint $table)
        {
            $table->increments('facebookphoto_project_bannerimage_id');
            $table->unsignedInteger('facebookphoto_id');
            $table->unsignedInteger('project_id');
            $table->smallInteger('relativeposition_top');
            $table->smallInteger('relativeposition_left');
            $table->timestamps();
            $table->softDeletes();

        });

        Schema::table('facebookphoto_project_bannerimages', function( $table)
        {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('youtubevideo_id')->references('youtubevideo_id')->on('youtubevideos')->onDelete('cascade');
        });*/
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

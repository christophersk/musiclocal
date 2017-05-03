<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersYoutubevideosProjectsYoutubevideosTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

        Schema::create('user_youtubevideo', function(Blueprint $table)
        {
            $table->increments('user_youtubevideo_id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('youtubevideo_id');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('user_youtubevideo', function( $table)
        {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('youtubevideo_id')->references('youtubevideo_id')->on('youtubevideos')->onDelete('cascade');
        });

		Schema::create('project_youtubevideo', function(Blueprint $table)
		{
			$table->increments('project_youtubevideo_id');
            $table->unsignedInteger('project_id');
            $table->unsignedInteger('youtubevideo_id');
			$table->timestamps();
            $table->softDeletes();
		});

        Schema::table('project_youtubevideo', function( $table)
        {
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->foreign('youtubevideo_id')->references('youtubevideo_id')->on('youtubevideos')->onDelete('cascade');
        });


	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('user_youtubevideo', function($table)
        {
            $table->dropForeign('user_youtubevideo_user_id_foreign');
            $table->dropForeign('user_youtubevideo_youtubevideo_id_foreign');
        });

        Schema::table('project_youtubevideo', function($table)
        {
            $table->dropForeign('project_youtubevideo_project_id_foreign');
            $table->dropForeign('project_youtubevideo_youtubevideo_id_foreign');
        });

        Schema::drop('user_youtubevideo');

		Schema::drop('project_youtubevideo');
	}

}

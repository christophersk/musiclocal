<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacebookphotoProjectTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('facebookphoto_project', function(Blueprint $table)
		{
            $table->increments('facebookphoto_project_id');
			$table->unsignedInteger('facebookphoto_id');
            $table->unsignedInteger('project_id');
            $table->timestamps();
            $table->softDeletes();
		});

        Schema::table('facebookphoto_project', function( $table)
        {
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
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

        Schema::table('facebookphoto_project', function($table)
        {
            $table->dropForeign('facebookphoto_project_project_id_foreign');
            $table->dropForeign('facebookphoto_project_facebookphoto_id_foreign');
        });

		Schema::drop('facebookphoto_project');
	}

}

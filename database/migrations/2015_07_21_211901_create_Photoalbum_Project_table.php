<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhotoalbumProjectTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('photoalbum_project', function(Blueprint $table)
		{
            $table->increments('photoalbum_project_id');
			$table->unsignedInteger('photoalbum_id');
            $table->unsignedInteger('project_id');
		});

        Schema::table('photoalbum_project', function( $table)
        {
			$table->foreign('photoalbum_id')->references('photoalbum_id')->on('photoalbums')->onDelete('cascade');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('photoalbum_project', function($table)
        {
        	$table->dropForeign('photoalbum_project_photoalbum_id_foreign');
            $table->dropForeign('photoalbum_project_project_id_foreign');
        });

		Schema::drop('photoalbum_project');
	}

}

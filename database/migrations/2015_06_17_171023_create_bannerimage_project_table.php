<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBannerimageProjectTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('bannerimage_project', function(Blueprint $table)
        {
            $table->increments('bannerimage_project_id');
            $table->unsignedInteger('bannerimage_id');
            $table->unsignedInteger('project_id');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('bannerimage_project', function( $table)
        {
            $table->foreign('bannerimage_id')->references('bannerimage_id')->on('bannerimages')->onDelete('cascade');
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
        Schema::table('bannerimage_project', function($table)
        {
            $table->dropForeign('bannerimage_project_bannerimage_id_foreign');
            $table->dropForeign('bannerimage_project_project_id_foreign');
        });

        Schema::drop('bannerimage_project');
	}

}

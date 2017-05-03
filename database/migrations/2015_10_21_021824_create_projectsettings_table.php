<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('projectsettings', function(Blueprint $table)
		{
			$table->increments('projectsetting_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->boolean('about_active')->default('0');
            $table->boolean('tour_active')->default('0');
            $table->boolean('video_active')->default('0');
            $table->boolean('social_active')->default('0');
            $table->boolean('audio_active')->default('0');
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
		Schema::table('projectsettings', function($table)
        {
            $table->dropForeign('projectsettings_project_id_foreign');
        });

		Schema::drop('projectsettings');
    }
}

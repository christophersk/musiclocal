<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCustomDomainToProjectsettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('projectsettings', function(Blueprint $table)
		{
            $table->unsignedTinyInteger('custom_domain')->default(0);
        });

        Schema::table('projectsettings', function($table)
        {
            $table->dropForeign('projectsettings_about_backgroundimage_id_foreign');
            $table->dropForeign('projectsettings_tour_backgroundimage_id_foreign');
            $table->dropForeign('projectsettings_video_backgroundimage_id_foreign');
            $table->dropForeign('projectsettings_social_backgroundimage_id_foreign');
            $table->dropForeign('projectsettings_audio_backgroundimage_id_foreign');
            $table->dropForeign('projectsettings_contact_backgroundimage_id_foreign');
            $table->dropForeign('projectsettings_epk_backgroundimage_id_foreign');
            $table->dropForeign('projectsettings_lessons_backgroundimage_id_foreign');
        });

        Schema::table('projectsettings', function($table)
        {
            $table->dropColumn('about_backgroundimage_id');
            $table->dropColumn('tour_backgroundimage_id');
            $table->dropColumn('video_backgroundimage_id');
            $table->dropColumn('social_backgroundimage_id');
            $table->dropColumn('audio_backgroundimage_id');
            $table->dropColumn('contact_backgroundimage_id');
            $table->dropColumn('epk_backgroundimage_id');
            $table->dropColumn('lessons_backgroundimage_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('projectsettings', function(Blueprint $table)
		{
            $table->dropColumn('custom_domain');
		});

		Schema::table('projectsettings', function(Blueprint $table)
		{
            $table->unsignedInteger('about_backgroundimage_id')->nullable();
            $table->foreign('about_backgroundimage_id')->references('backgroundimage_id')->on('backgroundimages');

            $table->unsignedInteger('tour_backgroundimage_id')->nullable();
            $table->foreign('tour_backgroundimage_id')->references('backgroundimage_id')->on('backgroundimages');

            $table->unsignedInteger('video_backgroundimage_id')->nullable();
            $table->foreign('video_backgroundimage_id')->references('backgroundimage_id')->on('backgroundimages');

            $table->unsignedInteger('social_backgroundimage_id')->nullable();
            $table->foreign('social_backgroundimage_id')->references('backgroundimage_id')->on('backgroundimages');

            $table->unsignedInteger('audio_backgroundimage_id')->nullable();
            $table->foreign('audio_backgroundimage_id')->references('backgroundimage_id')->on('backgroundimages');

            $table->unsignedInteger('contact_backgroundimage_id')->nullable();
            $table->foreign('contact_backgroundimage_id')->references('backgroundimage_id')->on('backgroundimages');

            $table->unsignedInteger('epk_backgroundimage_id')->nullable();
            $table->foreign('epk_backgroundimage_id')->references('backgroundimage_id')->on('backgroundimages');

            $table->unsignedInteger('lessons_backgroundimage_id')->nullable();
            $table->foreign('lessons_backgroundimage_id')->references('backgroundimage_id')->on('backgroundimages');
		});
    }
}

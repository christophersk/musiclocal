<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBackgroundimagesProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('backgroundimage_project', function(Blueprint $table)
        {
            $table->increments('backgroundimage_project_id');
            $table->unsignedInteger('backgroundimage_id');
            $table->foreign('backgroundimage_id')->references('backgroundimage_id')->on('backgroundimages')->onDelete('cascade');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->unsignedInteger('bannerheadline_id')->nullable();
            $table->foreign('bannerheadline_id')->references('bannerheadline_id')->on('bannerheadlines');
            $table->unsignedTinyInteger('section_id')->nullable();
            $table->unsignedTinyInteger('bannerheadline_style')->nullable();
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
        Schema::table('backgroundimage_project', function($table)
        {
            $table->dropForeign('backgroundimage_project_backgroundimage_id_foreign');
            $table->dropForeign('backgroundimage_project_project_id_foreign');
            $table->dropForeign('backgroundimage_project_bannerheadline_id_foreign');
        });

        Schema::drop('backgroundimage_project');
    }
}

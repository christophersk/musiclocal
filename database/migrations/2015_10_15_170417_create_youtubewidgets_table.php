<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateYoutubewidgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('youtubewidgets', function(Blueprint $table)
		{
			$table->increments('youtubewidget_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects');
            $table->mediumText('youtubewidget_path');
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
		Schema::table('youtubewidgets', function($table)
        {
            $table->dropForeign('youtubewidgets_project_id_foreign');
        });

		Schema::drop('youtubewidgets');
    }
}

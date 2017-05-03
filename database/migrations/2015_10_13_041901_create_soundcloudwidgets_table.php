<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSoundcloudwidgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('soundcloudwidgets', function(Blueprint $table)
		{
			$table->increments('soundcloudwidget_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects');
            $table->text('soundcloudwidget_path');
            $table->text('soundcloudwidget_script')->nullable();
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
		Schema::table('soundcloudwidgets', function($table)
        {
            $table->dropForeign('soundcloudwidgets_project_id_foreign');
        });

		Schema::drop('soundcloudwidgets');
    }
}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInstagramwidgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		Schema::create('instagramwidgets', function(Blueprint $table)
		{
			$table->increments('instagramwidget_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects');
            $table->mediumText('instagramwidget_path');
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
		Schema::table('instagramwidgets', function($table)
        {
            $table->dropForeign('instagramwidgets_project_id_foreign');
        });

		Schema::drop('instagramwidgets');
	}
}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTwitterwidgetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('twitterwidgets', function(Blueprint $table)
		{
			$table->increments('twitterwidget_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->mediumText('twitterwidget_path');
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
		Schema::table('twitterwidgets', function($table)
        {
            $table->dropForeign('twitterwidgets_project_id_foreign');
        });

		Schema::drop('twitterwidgets');
	}

}

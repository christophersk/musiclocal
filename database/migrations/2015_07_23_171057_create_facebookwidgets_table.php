<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacebookwidgetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('facebookwidgets', function(Blueprint $table)
		{
			$table->increments('facebookwidget_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->mediumText('facebookwidget_path');
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
		Schema::table('facebookwidgets', function($table)
        {
            $table->dropForeign('facebookwidgets_project_id_foreign');
        });

		Schema::drop('facebookwidgets');
	}

}

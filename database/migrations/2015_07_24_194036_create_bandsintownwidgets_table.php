<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBandsintownwidgetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bandsintownwidgets', function(Blueprint $table)
		{
			$table->increments('bandsintownwidget_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->mediumText('bandsintownwidget_artistname');
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
		Schema::table('bandsintownwidgets', function($table)
        {
            $table->dropForeign('bandsintownwidgets_project_id_foreign');
        });

		Schema::drop('bandsintownwidgets');
	}

}

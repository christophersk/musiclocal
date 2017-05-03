<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePastvenuelistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		Schema::create('pastvenuelists', function(Blueprint $table)
		{
			$table->increments('pastvenuelist_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->mediumText('pastvenuelist_content');
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
		Schema::table('pastvenuelists', function($table)
        {
            $table->dropForeign('pastvenuelists_project_id_foreign');
        });

		Schema::drop('pastvenuelists');
	}
}

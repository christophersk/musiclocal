<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsProjectTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('event_project', function(Blueprint $table)
        {
            $table->increments('event_project_id');
            $table->unsignedInteger('event_id');
            $table->unsignedInteger('project_id');
        });

        Schema::table('event_project', function( $table)
        {
            $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('event_project', function($table)
        {
            $table->dropForeign('event_project_event_id_foreign');
            $table->dropForeign('event_project_project_id_foreign');
        });

        Schema::drop('event_project');
	}

}

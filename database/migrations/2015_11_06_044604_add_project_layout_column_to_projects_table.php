<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectLayoutColumnToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('projects', function(Blueprint $table)
		{
            $table->unsignedTinyInteger('project_layout')->default(0);
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('projects', function(Blueprint $table)
		{
            $table->dropColumn('project_layout');
		});
    }
}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_project', function(Blueprint $table)
		{
            $table->increments('project_project_id');
			$table->unsignedInteger('parent_project_id');
			$table->foreign('parent_project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->unsignedInteger('child_project_id');
            $table->foreign('child_project_id')->references('project_id')->on('projects')->onDelete('cascade');
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
        Schema::table('project_project', function($table)
        {
            $table->dropForeign('project_project_parent_project_id_foreign');
            $table->dropForeign('project_project_child_project_id_foreign');
        });

		Schema::drop('project_project');
    }
}

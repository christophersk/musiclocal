<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('projects', function(Blueprint $table)
		{
			$table->increments('project_id');
            $table->string('project_name');
            $table->string('project_url')->unique();
            $table->unsignedInteger('project_location')->default('1');
            $table->unsignedInteger('project_type')->default('1');
            $table->boolean('project_active');
            $table->boolean('project_deleted');
            $table->tinyInteger('bandsintownwidget_active')->default('0');
			$table->timestamps();
            $table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('projects');
	}

}

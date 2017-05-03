<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectTypesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('project_types', function(Blueprint $table)
        {
            $table->increments('project_type_id');
            $table->string('project_type_name');
        });

        DB::table('project_types')->insert([
            ['project_type_name' => 'unspecified'],
            ['project_type_name' => 'Music']
        ]);

        Schema::table('projects', function($table)
        {
            $table->foreign('project_type')->references('project_type_id')->on('project_types');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('projects', function($table)
        {
            $table->dropForeign('projects_project_type_foreign');
        });

		Schema::drop('project_types');
	}

}

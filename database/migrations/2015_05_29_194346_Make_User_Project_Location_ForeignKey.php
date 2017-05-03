<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeUserProjectLocationForeignKey extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

        Schema::table('projects', function($table)
        {
            $table->foreign('project_location')->references('location_id')->on('locations');
        });

        Schema::table('users', function($table)
        {
            $table->foreign('user_location')->references('location_id')->on('locations');
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
            $table->dropForeign('projects_project_location_foreign');
        });

        Schema::table('users', function($table)
        {
            $table->dropForeign('users_user_location_foreign');
        });
	}

}

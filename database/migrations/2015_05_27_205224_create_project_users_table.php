<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('project_user', function(Blueprint $table)
        {
            $table->increments('project_user_id');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->unsignedInteger('project_user_permission');
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
        Schema::table('project_user', function($table)
        {
            $table->dropForeign('project_user_user_id_foreign');
        });

        Schema::table('project_user', function($table)
        {
            $table->dropForeign('project_user_project_id_foreign');
        });

		Schema::drop('project_user');
	}

}

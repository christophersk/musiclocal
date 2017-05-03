<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactinfoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('contactinfo', function(Blueprint $table)
		{
			$table->increments('contactinfo_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->string('contactinfo_email');
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
		Schema::table('contactinfo', function($table)
        {
            $table->dropForeign('contactinfo_project_id_foreign');
        });

		Schema::drop('contactinfo');
	}

}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomdomainsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		Schema::create('customdomains', function(Blueprint $table)
		{
			$table->increments('customdomain_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->string('customdomain_url');
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
		Schema::table('customdomains', function($table)
        {
            $table->dropForeign('customdomains_project_id_foreign');
        });

		Schema::drop('customdomains');
	}
}

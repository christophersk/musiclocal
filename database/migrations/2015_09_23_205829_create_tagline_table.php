<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTaglineTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		Schema::create('taglines', function(Blueprint $table)
		{
			$table->increments('tagline_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->text('tagline_content');
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
		Schema::table('taglines', function($table)
        {
            $table->dropForeign('taglines_project_id_foreign');
        });

		Schema::drop('taglines');
	}
}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookinglistingProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookinglisting_project', function(Blueprint $table)
		{
            $table->increments('bookinglisting_project_id');
			$table->unsignedInteger('bookinglisting_id');
			$table->foreign('bookinglisting_id')->references('bookinglisting_id')->on('bookinglistings')->onDelete('cascade');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
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
        Schema::table('bookinglisting_project', function($table)
        {
            $table->dropForeign('bookinglisting_project_project_id_foreign');
            $table->dropForeign('bookinglisting_project_bookinglisting_id_foreign');
        });

		Schema::drop('bookinglisting_project');
    }
}

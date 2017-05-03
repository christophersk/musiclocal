<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMailinglistwidgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('mailinglistwidgets', function(Blueprint $table)
		{
			$table->increments('mailinglistwidget_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects');
            $table->text('mailinglistwidget_script')->nullable();
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
		Schema::table('mailinglistwidgets', function($table)
        {
            $table->dropForeign('mailinglistwidgets_project_id_foreign');
        });

		Schema::drop('mailinglistwidgets');
    }
}

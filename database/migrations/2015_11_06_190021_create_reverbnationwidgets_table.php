<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReverbnationwidgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('reverbnationwidgets', function(Blueprint $table)
		{
			$table->increments('reverbnationwidget_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects');
            $table->text('reverbnationwidget_path')->nullable();
            $table->text('reverbnationwidget_script')->nullable();
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
		Schema::table('reverbnationwidgets', function($table)
        {
            $table->dropForeign('reverbnationwidgets_project_id_foreign');
        });

		Schema::drop('reverbnationwidgets');
    }
}

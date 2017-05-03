<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTourwidgetSelectionColumnToProjectsettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('projectsettings', function(Blueprint $table)
		{
            $table->unsignedTinyInteger('tourwidget_selection')->default(0);
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('projectsettings', function(Blueprint $table)
		{
            $table->dropColumn('tourwidget_selection');
		});
    }
}

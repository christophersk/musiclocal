<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLessonsActiveColumnToProjectsettingsTable extends Migration
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
            $table->boolean('lessons_active')->default('0');
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
            $table->dropColumn('lessons_active');
		});
    }
}

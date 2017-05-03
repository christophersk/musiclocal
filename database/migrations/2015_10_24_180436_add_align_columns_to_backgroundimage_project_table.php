<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAlignColumnsToBackgroundimageProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('backgroundimage_project', function(Blueprint $table)
		{
            $table->unsignedTinyInteger('align_horizontal')->default(1);
            $table->unsignedTinyInteger('align_vertical')->default(1);

		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('backgroundimage_project', function(Blueprint $table)
		{
            $table->dropColumn('align_horizontal');
            $table->dropColumn('align_vertical');
		});
    }
}

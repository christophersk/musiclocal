<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCoverActiveColumnToBackgroundimagesProjectTable extends Migration
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
            $table->unsignedTinyInteger('cover_active')->default(1);

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
            $table->dropColumn('cover_active');
		});
    }
}

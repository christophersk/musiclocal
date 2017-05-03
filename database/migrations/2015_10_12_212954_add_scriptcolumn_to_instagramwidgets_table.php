<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddScriptcolumnToInstagramwidgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('instagramwidgets', function(Blueprint $table)
		{
			$table->text('instagramwidget_script')->nullable();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('instagramwidgets', function(Blueprint $table)
		{
			$table->dropColumn('instagramwidget_script');
		});
    }
}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStateColumnToLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		Schema::table('locations', function(Blueprint $table)
		{
			$table->string('location_state', 2);
		});
	}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('locations', function(Blueprint $table)
		{
			$table->dropColumn('location_state');
		});
    }
}

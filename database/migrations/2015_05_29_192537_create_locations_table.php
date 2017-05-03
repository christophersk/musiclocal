<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('locations', function(Blueprint $table)
		{
            $table->increments('location_id');
            $table->string('location_name');
            $table->timestamps();
            $table->softDeletes();
		});

        DB::table('locations')->insert([
            ['location_name' => 'unspecified'],
            ['location_name' => 'Tallahassee']
        ]);
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('locations');
	}

}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('events', function(Blueprint $table) {
            $table->increments('event_id');
            $table->unsignedInteger('creator_user_id');  //actually, use this as the point person for the event //might need point contacts as a permission in the associated table to deal with multiple acts, sound, etc. //no foreign key, likely will not be used for lookups--might even be able to drop this
            $table->dateTime('event_start');
            $table->dateTime('event_end');
            $table->string('event_name');
            $table->string('event_location'); // location is venue name, but all of these fields are for non-musiclocal "dumb" event data.
            $table->smallInteger('event_city')->nullable();
            $table->smallInteger('event_state')->nullable();
            $table->mediumInteger('event_zip')->nullable();
            $table->tinyInteger('event_country')->nullable();
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
        Schema::drop('events');
	}

}

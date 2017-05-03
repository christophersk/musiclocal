<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookinglistingYoutubevideoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookinglisting_youtubevideo', function(Blueprint $table)
		{
            $table->increments('bookinglisting_youtubevideo_id');
			$table->unsignedInteger('bookinglisting_id');
			$table->foreign('bookinglisting_id')->references('bookinglisting_id')->on('bookinglistings')->onDelete('cascade');
            $table->unsignedInteger('youtubevideo_id');
            $table->foreign('youtubevideo_id')->references('youtubevideo_id')->on('youtubevideos')->onDelete('cascade');
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
        Schema::table('bookinglisting_youtubevideo', function($table)
        {
            $table->dropForeign('bookinglisting_youtubevideo_youtubevideo_id_foreign');
            $table->dropForeign('bookinglisting_youtubevideo_bookinglisting_id_foreign');
        });

		Schema::drop('bookinglisting_youtubevideo');
    }
}

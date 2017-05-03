<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBannerimagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('bannerimages', function(Blueprint $table)
        {
            $table->increments('bannerimage_id');
            $table->unsignedBigInteger('facebookphoto_identifier')->nullable();
            $table->string('bannerimage_uniqueid');
            $table->unsignedInteger('user_id')->nullable();
            //$table->SmallInteger('adjust_id')->unsigned();;
            //$table->smallInteger('relativeposition_top');
            //$table->smallInteger('relativeposition_left');
             //use this for any "modify this banner/re-create this banner" functionality
            $table->timestamp('created_at');
        });

        Schema::table('bannerimages', function( $table)
        {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('bannerimages', function($table)
        {
            $table->dropForeign('bannerimages_user_id_foreign');
        });

        Schema::drop('bannerimages');
	}

}

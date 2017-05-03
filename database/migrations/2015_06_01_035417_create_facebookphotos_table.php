<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacebookphotosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('facebookphotos', function(Blueprint $table)
		{
			$table->increments('facebookphoto_id');
            $table->unsignedBigInteger('facebookphoto_identifier')->unique();
            //$table->string('path0');
            //$table->string('path1');
            //$table->string('path2');
            //$table->string('path3');
            //$table->string('path4');
            //$table->string('path5');
            //$table->string('path6');
            //$table->string('picture');
            //$table->string('source');
            $table->string('from_name');
            $table->unsignedBigInteger('from_id');
            $table->dateTime('fb_created_time');
			$table->timestamps();
            $table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('facebookphotos');
	}

}

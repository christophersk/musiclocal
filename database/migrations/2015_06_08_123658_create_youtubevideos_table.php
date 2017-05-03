<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateYoutubevideosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('youtubevideos', function(Blueprint $table)
		{
			$table->increments('youtubevideo_id');
            $table->string('youtubevideo_identifier');
			$table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');
            //$table->boolean('autohide')->nullable();
            //$table->boolean('autoplay')->nullable();
            //$table->boolean('cc_load_policy')->nullable();
            //$table->string('color')->nullable();
            //$table->boolean('controls')->nullable();
            //$table->boolean('disablekb')->nullable();
            //$table->boolean('enablejsapi')->default('1');
            //$table->unsignedInteger('end')->nullable();
            //$table->boolean('fs')->nullable();
            //$table->string('hl', 10)->nullable();
            //$table->boolean('iv_load_policy')->nullable();
            //$table->string('list')->nullable();
            //$table->string('listType')->nullable();
            //$table->boolean('loop')->nullable();
            //$table->boolean('modestbranding')->nullable();
            //$table->boolean('playsinline')->nullable();
            //$table->boolean('rel')->nullable();
            //$table->boolean('showinfo')->nullable();
            //$table->unsignedInteger('start')->nullable();
            //$table->string('theme')->nullable();
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
		Schema::table('youtubevideos', function($table)
        {
            $table->dropForeign('youtubevideos_user_id_foreign');
        });

		Schema::drop('youtubevideos');
	}

}

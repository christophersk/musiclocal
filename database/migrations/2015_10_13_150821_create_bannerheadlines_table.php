<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBannerheadlinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bannerheadlines', function(Blueprint $table)
        {
            $table->increments('bannerheadline_id');
            $table->unsignedInteger('user_id')->nullable();
            $table->string('bannerheadline_h1')->nullable();
            $table->string('bannerheadline_h2')->nullable();
            $table->string('bannerheadline_h3')->nullable();
            $table->string('bannerheadline_h3link', 1000)->nullable();
            $table->timestamps();
        });

        Schema::table('bannerheadlines', function( $table)
        {
            $table->foreign('user_id')->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bannerheadlines', function($table)
        {
            $table->dropForeign('bannerheadlines_user_id_foreign');
        });

        Schema::drop('bannerheadlines');
    }
}

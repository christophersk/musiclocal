<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBannerheadlineStyleToBannerimagesProjectPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bannerimage_project', function(Blueprint $table)
        {
            $table->unsignedTinyInteger('bannerheadline_style')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bannerimage_project', function($table)
        {
            $table->dropColumn('bannerheadline_style');
        });
    }
}

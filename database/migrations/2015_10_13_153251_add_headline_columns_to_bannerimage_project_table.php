<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHeadlineColumnsToBannerimageProjectTable extends Migration
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
            $table->dropColumn('deleted_at');
            $table->unsignedInteger('bannerheadline_id')->nullable();
            $table->foreign('bannerheadline_id')->references('bannerheadline_id')->on('bannerheadlines');
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
            $table->dropForeign('bannerimage_project_bannerheadline_id_foreign');
            $table->softDeletes();
        });
        Schema::table('bannerimage_project', function($table)
        {
            $table->dropColumn('bannerheadline_id');
        });
    }
}

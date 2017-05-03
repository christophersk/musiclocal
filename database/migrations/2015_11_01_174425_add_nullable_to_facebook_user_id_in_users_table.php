<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNullableToFacebookUserIdInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('users', function(Blueprint $table)
		{
            $table->unsignedBigInteger('facebook_user_id')->nullable()->change();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('users', function(Blueprint $table)
		{
            $table->unsignedBigInteger('facebook_user_id')->change();
		});
    }
}

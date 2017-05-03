<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPasswordColumnToUsersTable extends Migration
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
            $table->string('password');
            $table->renameColumn('user_email', 'email');
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
            $table->dropColumn('password');
            $table->renameColumn('email', 'user_email');
		});
    }
}

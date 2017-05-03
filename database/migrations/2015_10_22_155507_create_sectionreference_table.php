<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSectionreferenceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('projectsections', function(Blueprint $table)
		{
            $table->increments('projectsection_id');
            $table->string('projectsection_name');
            $table->timestamps();
		});

        DB::table('projectsections')->insert([
            ['projectsection_name' => 'About'],
            ['projectsection_name' => 'Tour'],
            ['projectsection_name' => 'Video'],
            ['projectsection_name' => 'Audio']
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::drop('projectsections');
    }
}

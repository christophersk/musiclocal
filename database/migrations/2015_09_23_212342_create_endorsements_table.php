<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEndorsementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		Schema::create('endorsements', function(Blueprint $table)
		{
			$table->increments('endorsement_id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->text('endorsement_endorser');
            $table->text('endorsement_endorserbusiness');
            $table->mediumText('endorsement_content');
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
		Schema::table('endorsements', function($table)
        {
            $table->dropForeign('endorsements_project_id_foreign');
        });

		Schema::drop('endorsements');
	}
}

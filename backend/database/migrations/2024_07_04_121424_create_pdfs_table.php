<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pdfs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('ip', 45)->nullable();
            $table->string('url', 200)->nullable();
            $table->string('title', 200)->nullable();
            $table->string('lang')->nullable();
            $table->boolean('links')->default(false);
            $table->boolean('images')->default(false);
            $table->string('code', 50)->nullable();
            $table->integer('explored')->default(0);
            $table->string('sections', 70)->nullable();
            $table->unsignedBigInteger('theme')->index('fk_pdfs_themes1_idx');
            $table->boolean('infobox')->default(false);
            $table->boolean('pagination')->default(false);
            $table->boolean('toc')->default(false);
            $table->timestamps();
            $table->unsignedBigInteger('userid')->nullable()->index('fk_pdfs_users1_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pdfs');
    }
};

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
        Schema::table('pdfs', function (Blueprint $table) {
            $table->foreign(['theme'], 'fk_pdfs_themes1')->references(['id'])->on('themes')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['userid'], 'fk_pdfs_users1')->references(['id'])->on('users')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pdfs', function (Blueprint $table) {
            $table->dropForeign('fk_pdfs_themes1');
            $table->dropForeign('fk_pdfs_users1');
        });
    }
};

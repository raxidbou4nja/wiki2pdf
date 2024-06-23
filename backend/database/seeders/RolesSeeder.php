<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::query()->delete();
        DB::statement('ALTER TABLE roles AUTO_INCREMENT = 1');

        $admin = Role::create(['name' => 'admin']);
        $user = Role::create(['name' => 'user']);
    }
}

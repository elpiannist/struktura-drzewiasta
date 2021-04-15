<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BranchesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('branches')->insert([
            ['text' => 'Historyczne'],
            ['text' => 'Sci-Fi'],
            ['text' => 'Fantasy'],
            ['text' => 'Komiksy']
        ]);
        DB::table('branches')->insert([
           ['text'=>'Kaczor Donald', 'parent_id' => 4],
           ['text'=>'Harry Potter i Komnata Tajemnic', 'parent_id' => 3],
           ['text'=>'Pani Jeziora', 'parent_id' => 3],
           ['text'=>'Quo Vadis', 'parent_id' => 1],
           ['text'=>'Metro 2033', 'parent_id' => 2],
        ]);
    }
}

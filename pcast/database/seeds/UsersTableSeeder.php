<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\User::create([
           'name' => 'Administrator',
           'email' => 'admin@tdi.pt',
           'password' => Hash::make('admin123'),
        ]);

        \App\User::create([
            'name' => 'Manager',
            'email' => 'manager@tdi.pt',
            'password' => Hash::make('manager123'),
        ]);

        factory('App\User', 20)->create();
    }
}

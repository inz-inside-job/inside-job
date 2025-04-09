<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

test('non admin user cannot access horizon', function () {
    $response = $this->get('/admin/horizon');

    $response->assertStatus(403);
});

test('admin user can access horizon', function () {
    Role::create(['name' => UserRole::ADMIN->value]);

    $user = User::factory()->create();
    $user->assignRole(UserRole::ADMIN);
    $response = $this->actingAs($user)->get('/admin/horizon');

    $response->assertStatus(200);
});

<?php

use App\Enums\CompanyUserRole;
use App\Enums\UserRole;
use App\Models\Company;
use App\Models\CompanyClaimSubmission;
use App\Models\CompanySubmission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    Role::create(['name' => UserRole::ADMIN->value]);
    Role::create(['name' => CompanyUserRole::OWNER->value]);

    $this->admin = User::factory()->create();
    $this->admin->assignRole(UserRole::ADMIN->value);
    $this->actingAs($this->admin);
});

test('it lists company submissions on the dashboard', function () {
    CompanySubmission::factory()->count(3)->create();

    $response = $this->get('/admin/submissions');

    $response->assertStatus(200);
});

test('it views a specific company submission', function () {
    $submission = CompanySubmission::factory()->create();

    $response = $this->get("/admin/submissions/{$submission->id}");

    $response->assertStatus(200);
    $response->assertSee($submission->name);
});

test('it approves a company submission', function () {
    $submission = CompanySubmission::factory()->create(['status' => 'pending']);

    $this->post("/admin/submissions/{$submission->id}", ['action' => 'approve'])
        ->assertRedirect("/admin/submissions/{$submission->id}");

    $submission->refresh();
    expect($submission->status)->toBe('approved');
    expect(Company::where('name', $submission->name)->exists())->toBeTrue();
});

test('it rejects a company submission', function () {
    $submission = CompanySubmission::factory()->create(['status' => 'pending']);

    $this->post("/admin/submissions/{$submission->id}", ['action' => 'reject'])
        ->assertRedirect("/admin/submissions/{$submission->id}");

    $submission->refresh();
    expect($submission->status)->toBe('rejected');
});

test('it lists company claims', function () {
    CompanyClaimSubmission::factory()->count(3)->create();

    $response = $this->get('/admin/claims');

    $response->assertStatus(200);
});

test('it views a specific company claim', function () {
    $claim = CompanyClaimSubmission::factory()->create();

    $response = $this->get("/admin/claims/{$claim->id}");

    $response->assertStatus(200);
    $response->assertSee($claim->user->name);
});

test('it approves a company claim', function () {
    $claim = CompanyClaimSubmission::factory()->create(['status' => 'pending']);

    $this->post("/admin/claims/{$claim->id}", ['action' => 'approve'])
        ->assertRedirect("/admin/claims/{$claim->id}");

    $claim->refresh();

    expect($claim->status)->toBe(\App\Enums\CompanySubmissionStatus::APPROVED->value)
        ->and($claim->company->claimed)->toBe(1)
        ->and($claim->company->users()->get()->where('id', $claim->user_id)->count() >= 1)->toBeTrue();
});

test('it rejects a company claim', function () {
    $claim = CompanyClaimSubmission::factory()->create(['status' => 'pending']);

    $this->post("/admin/claims/{$claim->id}", ['action' => 'reject'])
        ->assertRedirect("/admin/claims/{$claim->id}");

    $claim->refresh();
    expect($claim->status)->toBe('rejected');
});

<?php

use App\Models\Vote;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('result.{electionId}', function ($user, Vote $electionId) {
    return true;
});

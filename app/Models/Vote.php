<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    /** @use HasFactory<\Database\Factories\VoteFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'election_id',
        'candidate_id',
    ];

    public function users()
    {

        return $this->hasMany(User::class);
    }

    public function elections()
    {

        return $this->hasMany(Election::class);
    }

    public function candiates()
    {

        return $this->hasMany(Candidate::class);
    }
}
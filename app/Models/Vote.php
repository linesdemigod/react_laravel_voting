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

    public function user()
    {

        return $this->belongsTo(User::class);
    }

    public function elections()
    {

        return $this->hasMany(Election::class);
    }

    public function candidate
    (
    ) {

        return $this->belongsTo(Candidate::class);
    }
}

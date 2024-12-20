<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    /** @use HasFactory<\Database\Factories\CandidateFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'party',
        'election_id',
        'profile'
    ];

    public function party()
    {

        return $this->belongsTo(Party::class);
    }

    public function election()
    {

        return $this->belongsTo(Election::class);
    }

    public function votes()
    {

        return $this->hasMany(Vote::class);
    }
}

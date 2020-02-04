<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'user_id', 'podcast_id',
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function podcast(){
        return $this->belongsTo('App\Podcast');
    }
}

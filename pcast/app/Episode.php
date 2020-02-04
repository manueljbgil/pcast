<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'votes','reproductions','file','podcast_id'
    ];

    public function podcast(){
        return $this->belongsTo('App\Podcast');
    }
}

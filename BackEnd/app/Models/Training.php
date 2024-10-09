<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Training extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'title',
        'description',
        'video_url',
    ];

    protected static function boot()
    {
        parent::boot();
        // Automatically generate UUID for each new model
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'tag_training');
    }

}

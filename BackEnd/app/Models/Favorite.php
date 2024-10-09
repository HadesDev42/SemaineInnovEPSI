<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Favorite extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    // Mass assignable attributes
    protected $fillable = [
        'user_id',
        'training_id',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    /**
     * Get the user that owns the favorite.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Get the training that this favorite belongs to.
     */
    public function training()
    {
        return $this->belongsTo(Training::class, 'training_id', 'id');
    }
}

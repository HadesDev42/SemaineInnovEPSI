<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Training;
use Validator;

class FavoritesController extends BaseController
{
    public function create(Request $request)
    {
        // Create a new favorite
        $validator = Validator::make($request->all(), [
            'training_id' => 'required|string'
        ]);
        $user = $request->user();
        $request['user_id'] = $user->id;
        if (Favorite::where('user_id', $user->id)->where('training_id', $request->training_id)->exists()) {
            return $this->sendError('Favorite already exists.');
        }
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $favorite = Favorite::create($request->all());

        return $this->sendResponse($favorite, 'Favorite created successfully.');
    }

    public function remove(Request $request)
    {
        // Remove a favorite
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $favorite = Favorite::find($request->id);
        if (is_null($favorite)) {
            return $this->sendError('Favorite not found.');
        }
        $favorite->delete();
        return $this->sendResponse($favorite, 'Favorite removed successfully.');
    }

    public function index()
    {
        // Get all favorites
        $favorites = Favorite::all();

        return $this->sendResponse($favorites, 'Favorites retrieved successfully.');
    }

    public function getUserFavorites(Request $request)
    {
        // Get all favorites by the token user
        $favorites = Favorite::where('user_id', $request->user()->id)->get();

        $trainings = [];
        // take only id and title from training
        foreach ($favorites as $favorite) {
            $training = Training::find($favorite->training_id);
            if ($training) {
                $trainings[] = [
                    'id' => $training->id,
                    'title' => $training->title
                ];
            }
        }
        return $this->sendResponse($trainings, 'Favorites retrieved successfully.');
    }
}

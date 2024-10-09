<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoritesController extends BaseController
{
    public function create(Request $request)
    {
        // Create a new favorite
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'training_id' => 'required|integer'
        ]);
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
}

<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\Training;

class TrainingsController extends Controller
{
    public function create(Request $request)
    {
        // Create a new training
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'video_url' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $training = Training::create($request->all());

        return response()->json(['training' => $training], 201);
    }

    public function index()
    {
        // Get all trainings
        $trainings = Training::all();

        return response()->json(['trainings' => $trainings]);
    }
}

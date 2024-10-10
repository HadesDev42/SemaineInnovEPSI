<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\API\BaseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Choice;
use Validator;

class ChoicesController extends BaseController
{
    public function create(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'question_id' => 'required|string',
            'choice_text' => 'required|string',
            'is_correct' => 'required|boolean',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        // Create new choice
        $choice = new Choice();
        $choice->question_id = $request->question_id;
        $choice->choice_text = $request->choice_text;
        $choice->is_correct = $request->is_correct;
        $choice->save();

        return $this->sendResponse($choice, 'Choice created successfully.');
    }

    public function getChoicesByQuestionId(Request $request)
    {
        // Get all choices by question_id
        if ($request->route('question_id') == null) {
            return response()->json(['error' => 'Question ID is required.'], 400);
        }
        $choices = Choice::where('question_id', $request->route('question_id'))->get();

        return $this->sendResponse($choices, 'Choices retrieved successfully.');
    }
}

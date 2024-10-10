<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\API\BaseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use Validator;

class QuestionsController extends BaseController
{
    public function create(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'training_id' => 'required|string',
            'question_text' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        // Create new question
        $question = new Question();
        $question->training_id = $request->training_id;
        $question->question_text = $request->question_text;
        $question->save();

        return $this->sendResponse($question, 'Question created successfully.');
    }

    public function getQuestionsByTrainingId(Request $request)
    {
        // Get all questions by training_id
        if ($request->route('training_id') == null) {
            return response()->json(['error' => 'Training ID is required.'], 400);
        }
        $questions = Question::where('training_id', $request->route('training_id'))->get();

        return $this->sendResponse($questions, 'Questions retrieved successfully.');
    }
}

<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\API\BaseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TagTraining;
use App\Models\Tag;
use Validator;

class TagsTrainingController extends BaseController
{
    public function create(Request $request)
    {
        // Create a new tag training
        $validator = Validator::make($request->all(), [
            'tag_id' => 'required|string',
            'training_id' => 'required|string'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $tagTraining = TagTraining::create($request->all());

        return $this->sendResponse($tagTraining, 'Tag training created successfully.');
    }

    public function remove(Request $request)
    {
        // Remove a tag training
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $tagTraining = TagTraining::find($request->id);
        if (is_null($tagTraining)) {
            return $this->sendError('Tag training not found.');
        }
        $tagTraining->delete();
        return $this->sendResponse($tagTraining, 'Tag training removed successfully.');
    }

    public function getTagsByTrainingId(Request $request)
    {
        // Get all tag name by training_id
        if ($request->route('training_id') == null) {
            return $this->sendError('Validation Error.', ['error' => 'Training ID is required.']);
        }
        $user = $request->user();
        if (is_null($user)) {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
        $tagTraining = TagTraining::where('training_id', $request->route('training_id'))->get();
        $tags = [];
        foreach ($tagTraining as $tag) {
            $tag = Tag::find($tag->tag_id);
            array_push($tags, $tag);
        }

        return $this->sendResponse($tags, 'Tags retrieved successfully.');
    }
}

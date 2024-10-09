<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\API\BaseController;
use Illuminate\Http\Request;
use App\Models\Tag;
use Validator;

class TagsController extends BaseController
{
    public function create(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $tag = Tag::create($request->only('name'));

        return $this->sendResponse($tag, 'Tag created successfully.');
    }
}

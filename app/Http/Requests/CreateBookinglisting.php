<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class CreateBookinglisting extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'bookinglisting_title' => 'required|between:3,255',
            'bookinglisting_content' => 'required|between:3,2700'
        ];
    }
}

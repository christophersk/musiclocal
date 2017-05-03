<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UpdateUserInfo extends Request
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
			'user_first_name' => 'max:250',
            'user_last_name' => 'max:250',
            //'email' => 'required|max:250|unique:users|email',
            'user_location' => ''
		];
    }
}

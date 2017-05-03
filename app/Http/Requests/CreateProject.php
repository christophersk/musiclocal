<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class CreateProject extends Request {

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
			'project_name' => 'required|max:250',
            'project_url' => 'required|alpha_dash|between:2,250|unique:projects,project_url',
            'location_id' => 'required'
		];
	}

}

<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class CreateEvent extends Request {

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
			'event_name' => 'required',
            'event_location' => 'required',
            'event_start_day' => 'required',
            'event_start_month' => 'required',
            'event_start_year' => 'required',
            'event_start_hour' => 'required',
            'event_start_minute' => 'required',
            'event_start_ampm' => 'required',
            'event_end_day' => 'required',
            'event_end_month' => 'required',
            'event_end_year' => 'required',
            'event_end_hour' => 'required',
            'event_end_minute' => 'required',
            'event_end_ampm' => 'required',
		];
	}

}

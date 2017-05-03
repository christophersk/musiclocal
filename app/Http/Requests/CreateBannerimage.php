<?php namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Auth;

class CreateBannerimage extends Request {

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
        $user = Auth::user();
        $adjust_id = Request::input('adjust_id');
		return [
			//'facebookphoto_id' => 'required|unique:bannerimages,facebookphoto_id,NULL,bannerimage_id,adjust_id,' . $adjust_id . ',user_id,' . $user->user_id . ',created_at,',
            'facebookphoto_id' => 'required',
            'facebookphoto_identifier' => 'required',
            'user_id' => 'required',
            'adjust_id' => 'required',
		];
	}

}

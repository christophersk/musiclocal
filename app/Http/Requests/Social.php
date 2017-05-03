<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class Social extends Request
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
            'instagramwidget_script' => 'between:3,1000',
            'instagramwidget_url' => 'between:1,250',
            'soundcloudwidget_script' => 'between:3,1000',
            'soundcloudwidget_url' => 'between:1,250'
        ];
    }
}

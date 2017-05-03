<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Photoalbum;
use Illuminate\Http\Request;

class EmbeddablesController extends Controller {

	public function get_photoalbum_page(Requests\UnrestrictedRequest $request){
		$photoalbuminfo = $request->only('photoalbum_id');
        extract($photoalbuminfo, EXTR_OVERWRITE);

		return view ('pages.embeddables_photoalbum', compact('photoalbum_id'));
	}

	public function get_photoalbum_photos(Requests\UnrestrictedRequest $request){
		$photoalbuminfo = $request->only('photoalbum_id');
        extract($photoalbuminfo, EXTR_OVERWRITE);

        $photoalbum = Photoalbum::find($photoalbum_id);
        $photoobjects = $photoalbum->facebookphotos()->get();
        $filenamearray = [];
        foreach ($photoobjects as $photoobject){
        	$filename = md5($photoobject->facebookphoto_identifier);
        	array_push($filenamearray, ['filename' => $filename]);
        }

        return json_encode(['filenames' => $filenamearray, 'albumname' => $photoalbum->photoalbum_name]);
	}

}

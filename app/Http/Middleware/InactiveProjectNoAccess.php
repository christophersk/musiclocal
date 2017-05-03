<?php namespace App\Http\Middleware;

use Closure;
use App\Project;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class InactiveProjectNoAccess {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
        //dd($request->route('project_url'));
        try {
            $projectrequested = Project::where('project_url', '=', $request->route('project_url'))->firstOrFail();
            //dd($projectrequested);
        }
        catch (ModelNotFoundException $e) {
            return redirect('user');
        }

        if ($projectrequested->project_active != 1){
            //dd($projectrequested->project_active);
            return redirect('user');
        }
        else {
		return $next($request);
        }
	}

}

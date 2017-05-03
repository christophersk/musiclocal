<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Project;
use App\Contact;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class ProjectsController extends Controller {


//This section is for duplicating routes to test versions of pages and resources on the live server

    public function test_project($project_url)
    {
        $user = Auth::user();
        $project = Project::where('project_url', $project_url)->firstOrFail();
        if ($project->project_active == 1) {
            $content = view('pages.project_home_2', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=5, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

//end test section


    public function __construct()
    {
        //$this->middleware('InactiveProjectNoAccess');

    }

    public function project($project_url)
    {
        $user = Auth::user();
        try {
            $project = Project::where('project_url', $project_url)->firstOrFail();
        } catch(ModelNotFoundException $e) {

            return redirect(env('PROJECT_URL'));
        }
        if ($project->project_active == 1) {
            $content = view('pages.project_home_2', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function project_chrisskenemusicdotcom()
    {
        $user = Auth::user();
        $project = Project::find(3);

        if ($project->project_active == 1) {
            $content = view('pages.project_home_2', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function childproject_chrisskenemusicdotcom($project_url)
    {
        $user = Auth::user();
        $parentproject = Project::find(3);
        foreach ($parentproject->childprojects as $project) {
            if ($project->project_url == $project_url) {
                if ($project->project_active == 1) {
                    $content = view('pages.project_home_2', compact('project', 'user'));
                    $response = response($content);
                    $response->header('Cache-Control', 'max-age=10, public');
                    return $response;
                }
            }
        }
        return redirect()->away('//www.' . $parentproject->customdomain->customdomain_url);
    }

    public function project_chrisskenebanddotcom()
    {
        $user = Auth::user();
        $project = Project::find(23);

        if ($project->project_active == 1) {
            $content = view('pages.project_home_2', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function childproject_chrisskenebanddotcom($project_url)
    {
        $user = Auth::user();
        $parentproject = Project::find(23);
        foreach ($parentproject->childprojects as $project) {
            if ($project->project_url == $project_url) {
                if ($project->project_active == 1) {
                    $content = view('pages.project_home_2', compact('project', 'user'));
                    $response = response($content);
                    $response->header('Cache-Control', 'max-age=10, public');
                    return $response;
                }
            }
        }
        return redirect()->away('//www.' . $parentproject->customdomain->customdomain_url);
    }

    public function project_katieskenemusicdotcom()
    {
        $user = Auth::user();
        $project = Project::find(7);

        if ($project->project_active == 1) {
            $content = view('pages.project_home_2', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function childproject_katieskenemusicdotcom($project_url)
    {
        $user = Auth::user();
        $parentproject = Project::find(7);
        foreach ($parentproject->childprojects as $project) {
            if ($project->project_url == $project_url) {
                if ($project->project_active == 1) {
                    $content = view('pages.project_home_2', compact('project', 'user'));
                    $response = response($content);
                    $response->header('Cache-Control', 'max-age=10, public');
                    return $response;
                }
            }
        }
        return redirect()->away('//www.' . $parentproject->customdomain->customdomain_url);
    }

    public function project_skeneabrahamdotcom()
    {
        $user = Auth::user();
        $project = Project::find(27);

        if ($project->project_active == 1) {
            $content = view('pages.project_home_2', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function childproject_skeneabrahamdotcom($project_url)
    {
        $user = Auth::user();
        $parentproject = Project::find(27);
        foreach ($parentproject->childprojects as $project) {
            if ($project->project_url == $project_url) {
                if ($project->project_active == 1) {
                    $content = view('pages.project_home_2', compact('project', 'user'));
                    $response = response($content);
                    $response->header('Cache-Control', 'max-age=10, public');
                    return $response;
                }
            }
        }
        return redirect()->away('//www.' . $parentproject->customdomain->customdomain_url);
    }

    public function project_themidtownersdotcom()
    {
        $user = Auth::user();
        $project = Project::find(28);

        if ($project->project_active == 1) {
            $content = view('pages.project_home_2', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function childproject_themidtownersdotcom($project_url)
    {
        $user = Auth::user();
        $parentproject = Project::find(28);
        foreach ($parentproject->childprojects as $project) {
            if ($project->project_url == $project_url) {
                if ($project->project_active == 1) {
                    $content = view('pages.project_home_2', compact('project', 'user'));
                    $response = response($content);
                    $response->header('Cache-Control', 'max-age=10, public');
                    return $response;
                }
            }
        }
        return redirect()->away('//www.' . $parentproject->customdomain->customdomain_url);
    }

    public function project_chrisskenemusicdotcom_epk()
    {
        $user = Auth::user();
        $project = Project::find(3);

        if ($project->project_active == 1) {
            $content = view('pages.project_epk_1', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function project_katieskenemusicdotcom_epk()
    {
        $user = Auth::user();
        $project = Project::find(7);

        if ($project->project_active == 1) {
            $content = view('pages.project_home', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function project_rachelhillmanbanddotcom_epk()
    {
        $user = Auth::user();
        $project = Project::find(8);

        if ($project->project_active == 1) {
            $content = view('pages.project_home', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function project_epk($project_url)
    {
        $user = Auth::user();
        $project = Project::where('project_url', $project_url)->firstOrFail();

        if ($project->project_active == 1) {
            $content = view('pages.project_epk_1', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function project_lessons($project_url)
    {
        $user = Auth::user();
        $project = Project::where('project_url', $project_url)->firstOrFail();


        if ($project->project_active == 1) {
            if ($project->projectsettings->lessons_active == 0) {
                return redirect(env('PROJECT_URL'));
            }
            else {
            $content = view('pages.project_lessons', compact('project', 'user'));
            $response = response($content);
            $response->header('Cache-Control', 'max-age=10, public');
            return $response;
            }
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function project_chrisskenemusicdotcom_lessons()
    {
        $user = Auth::user();
        $project = Project::find(3);

        if ($project->project_active == 1) {
            if ($project->projectsettings->lessons_active == 0) {
                return redirect(env('PROJECT_URL'));
            }
            else {
                $content = view('pages.project_lessons', compact('project', 'user'));
                $response = response($content);
                $response->header('Cache-Control', 'max-age=10, public');
                return $response;
            }
        }
        else {
            return redirect(env('PROJECT_URL'));
        }
    }

    public function project_media($project_url)
    {
        return redirect(env('PROJECT_URL'));
        $user = Auth::user();
        $project = Project::where('project_url', $project_url)->firstOrFail();
        return view('pages.project_media', compact('project', 'user'));
    }

    public function project_subscribe(Requests\SubscribeRequest $request)
    {
        $requestinfo = $request->only(['contact_email', 'project_id']);
        extract($requestinfo, EXTR_OVERWRITE);

        Contact::firstOrCreate(['contact_email' => $contact_email, 'project_id' => $project_id]);

        return 'Your email has been added!';
    }
}
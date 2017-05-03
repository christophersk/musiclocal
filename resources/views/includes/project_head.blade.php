

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="{{ $project->project_name }}<?php if ($project->tagline === null){} else {echo ': ' . $project->tagline->tagline_content;} ?> from {{ $locname }}, {{ $locstate }}.">
    <meta name="keywords" content="MusicLocal {{ $project->project_name }}">
    <meta name="author" content="{{ $project->project_name }}">
    <title>{{ $project->project_name }} | <?php if ($project->tagline === null){} else {echo $project->tagline->tagline_content . ' ';} ?>from {{ $locname }}, {{ $locstate }}.</title>


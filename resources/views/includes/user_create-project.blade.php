{!! Form::open(['url' => 'user']) !!}
    <div class="form-group">
        {!! Form::label('project_name', 'Project Name:') !!}
        {!! Form::text('project_name', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('project_url', 'Project URL:') !!}
        {!! Form::text('project_url', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('project_location', 'Project Location:') !!}
        {!! Form::select('project_location', array('2' => 'Tallahassee'), null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('project_type', 'Project Type:') !!}
        {!! Form::select('project_type', array('2' => 'Music'), null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! form::hidden('user_id', $user->user_id, [null]) !!}
        {!! Form::submit('Add Project', ['class' => 'btn btn-primary form-control']) !!}
    </div>
{!! Form::close() !!}

@if ($errors->any())
    <ul class="alert alert-danger">
    @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
    @endforeach
    </ul>
@endif
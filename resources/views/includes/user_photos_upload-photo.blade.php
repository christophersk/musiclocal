{!! Form::open(['url' => 'user/photos/upload', 'files' => true]) !!}
    <div class="form-group">
        {!! Form::label('photo', 'Photo:') !!}
        {!! Form::file('photo') !!}
    </div>


    <div class="form-group">
        {!! form::hidden('user_id', $user->user_id, [null]) !!}
        {!! Form::submit('Add Photo', ['class' => 'btn btn-primary form-control']) !!}
    </div>
{!! Form::close() !!}

@if ($errors->any())
    <ul class="alert alert-danger">
    @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
    @endforeach
    </ul>
@endif
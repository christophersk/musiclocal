{!! Form::open(['url' => 'user/videos']) !!}
    <div class="form-group">
        {!! Form::label('youtubevideo_identifier', 'Youtube Video URL:') !!}
        {!! Form::text('youtubevideo_identifier', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! form::hidden('user_id', $user->user_id, [null]) !!}
        {!! Form::submit('Add Youtube Video', ['class' => 'btn btn-primary form-control']) !!}
    </div>
{!! Form::close() !!}

@if ($errors->any())
    <ul class="alert alert-danger">
    @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
    @endforeach
    </ul>
@endif
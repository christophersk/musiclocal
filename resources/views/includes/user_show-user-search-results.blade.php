{!! Form::open(['url' => 'user/ajax/get/search/users']) !!}


    <div class="form-group">
        {!! Form::input('search', 'q', null, ['placeholder' => 'Search...']) !!}

    </div>

{!! Form::close() !!}

@if ($errors->any())
    <ul class="alert alert-danger">
    @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
    @endforeach
    </ul>
@endif
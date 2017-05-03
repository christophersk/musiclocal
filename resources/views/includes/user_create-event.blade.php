{!! Form::open(['url' => 'user/schedule/createevent']) !!}

<div class="form-horizontal">
    <div class="form-group">
        {!! Form::label('event_project', 'Project(s) Performing:', ['class' => 'col-sm-2']) !!}
        <div class="col-sm-10">
        <div class="row">
        @foreach($projects as $project)
                <div class="col-sm-1">
                    <input name="{{ $project->project_id }}" type="checkbox" id="{{ $project->project_id }}">
                </div>
        <label for="{{ $project->project_url }}" class="col-sm-3">{{ $project->project_name }}</label>
        @endforeach
            </div>
    </div>
    </div>
</div>


<!--check here to see if the user creating the event owns the peformer or venue project; only if user is a performer allow to invite people.-->

<div class="form-horizontal">
    <div class="form-group">
        {!! Form::label('event_user', 'User(s) to Invite:', ['class' => 'col-sm-2']) !!}
        <div class="col-sm-10">
            <div class="row">
                @foreach ($projectusers as $projectuser)

                    @foreach ($projectuser as $puser)

                        <div class="col-sm-1">
                        <input name="invited_user_{{ $puser->user_id }}" type="checkbox" value="{{ $puser->user_id }}" id="{{ $puser->user_id }}">
                        </div>
                        <label for="invited_users" class="col-sm-3">{{ $puser->user_first_name }} {{ $puser->user_last_name }}</label>

                    @endforeach
                @endforeach

            </div>
        </div>
    </div>
</div>

<div class="form-horizontal">
    <div class="col-sm-10 col-sm-offset-2" style="border-bottom: solid #999999 1px; margin-bottom: 2%;"></div>
</div>

<div class="form-horizontal">
    <div class="form-group">
        {!! Form::label('event_name', 'Event Name:', ['class' => 'col-sm-2']) !!}
        <div class="col-sm-10">
            {!! Form::text('event_name', null, ['class' => 'form-control']) !!}
        </div>
    </div>
<div class="form-group">
    {!! Form::label('event_start', 'Event Start:', ['class' => 'col-sm-3']) !!}
    {!! Form::label('event_start_day', 'Day:', ['class' => 'col-sm-1']) !!}
    <div class="col-sm-2">
    {!! Form::select('event_start_day', array(
        null => '-',
        '1' => '1',
        '2' => '2',
        '3' => '3',
        '4' => '4',
        '5' => '5',
        '6' => '6',
        '7' => '7',
        '8' => '8',
        '9' => '9',
        '10' => '10',
        '11' => '11',
        '12' => '12',
        '13' => '13',
        '14' => '14',
        '15' => '15',
        '16' => '16',
        '17' => '17',
        '18' => '18',
        '19' => '19',
        '20' => '20',
        '21' => '21',
        '22' => '22',
        '23' => '23',
        '24' => '24',
        '25' => '25',
        '26' => '26',
        '27' => '27',
        '28' => '28',
        '29' => '29',
        '30' => '30',
        '31' => '31'
        ), null, ['class' => 'form-control']) !!}
    </div>
    {!! Form::label('event_start_month', 'Month:', ['class' => 'col-sm-1']) !!}
    <div class="col-sm-2">
    {!! Form::selectMonth('event_start_month', null, ['class' => 'form-control']) !!}
    </div>
    {!! Form::label('event_start_year', 'Year:', ['class' => 'col-sm-1']) !!}
        <div class="col-sm-2">
    {!! Form::selectRange('event_start_year', 2015, 2020, null, ['class' => 'form-control']) !!}
        </div>
</div>

<div class="form-group">
    {!! Form::label('event_start_hour', 'Hour:', ['class' => 'col-sm-1 col-sm-offset-3']) !!}
    <div class="col-sm-2">
    {!! Form::select('event_start_hour', array(
        null => '-',
        '1' => '1',
        '2' => '2',
        '3' => '3',
        '4' => '4',
        '5' => '5',
        '6' => '6',
        '7' => '7',
        '8' => '8',
        '9' => '9',
        '10' => '10',
        '11' => '11',
        '12' => '12'
        ), null, ['class' => 'form-control']) !!}
    </div>
    {!! Form::label('event_start_minute', 'Minute:', ['class' => 'col-sm-1']) !!}
        <div class="col-sm-2">
    {!! Form::select('event_start_minute', array(
    null => '-',
    '00' => '00',
    '05' => '05',
    '10' => '10',
    '15' => '15',
    '20' => '20',
    '25' => '25',
    '30' => '30',
    '35' => '35',
    '40' => '40',
    '45' => '45',
    '50' => '50',
    '55' => '55'
    ), null, ['class' => 'form-control']) !!}
        </div>
    {!! Form::label('event_start_ampm', 'AM/PM:', ['class' => 'col-sm-1']) !!}
    <div class="col-sm-2">
        {!! Form::select('event_start_ampm', array('am' => 'a.m.', 'pm' => 'p.m.'), 'pm', ['class' => 'form-control']) !!}
    </div>
    </div>
<div class="form-horizontal">
    <div class="col-sm-9 col-sm-offset-3" style="border-bottom: solid #999999 1px; margin-bottom: 2%;"></div>
</div>
</div>
<div class="form-horizontal">
    <div class="form-group">
        {!! Form::label('event_end', 'Event End:', ['class' => 'col-sm-3']) !!}
        {!! Form::label('event_end_day', 'Day:', ['class' => 'col-sm-1']) !!}
        <div class="col-sm-2">
            {!! Form::select('event_end_day', array(
            null => '-',
            '1' => '1',
            '2' => '2',
            '3' => '3',
            '4' => '4',
            '5' => '5',
            '6' => '6',
            '7' => '7',
            '8' => '8',
            '9' => '9',
            '10' => '10',
            '11' => '11',
            '12' => '12',
            '13' => '13',
            '14' => '14',
            '15' => '15',
            '16' => '16',
            '17' => '17',
            '18' => '18',
            '19' => '19',
            '20' => '20',
            '21' => '21',
            '22' => '22',
            '23' => '23',
            '24' => '24',
            '25' => '25',
            '26' => '26',
            '27' => '27',
            '28' => '28',
            '29' => '29',
            '30' => '30',
            '31' => '31'
            ), null, ['class' => 'form-control']) !!}
        </div>
        {!! Form::label('event_end_month', 'Month:', ['class' => 'col-sm-1']) !!}
        <div class="col-sm-2">
            {!! Form::selectMonth('event_end_month', null, ['class' => 'form-control']) !!}
        </div>
        {!! Form::label('event_end_year', 'Year:', ['class' => 'col-sm-1']) !!}
        <div class="col-sm-2">
            {!! Form::selectRange('event_end_year', 2015, 2020, null, ['class' => 'form-control']) !!}
        </div>
    </div>

    <div class="form-group">
        {!! Form::label('event_end_hour', 'Hour:', ['class' => 'col-sm-1 col-sm-offset-3']) !!}
        <div class="col-sm-2">
            {!! Form::select('event_end_hour', array(
            null => '-',
            '1' => '1',
            '2' => '2',
            '3' => '3',
            '4' => '4',
            '5' => '5',
            '6' => '6',
            '7' => '7',
            '8' => '8',
            '9' => '9',
            '10' => '10',
            '11' => '11',
            '12' => '12'
            ), null, ['class' => 'form-control']) !!}
        </div>
        {!! Form::label('event_end_minute', 'Minute:', ['class' => 'col-sm-1']) !!}
        <div class="col-sm-2">
            {!! Form::select('event_end_minute', array(
            null => '-',
            '00' => '00',
            '05' => '05',
            '10' => '10',
            '15' => '15',
            '20' => '20',
            '25' => '25',
            '30' => '30',
            '35' => '35',
            '40' => '40',
            '45' => '45',
            '50' => '50',
            '55' => '55'
            ), null, ['class' => 'form-control']) !!}
        </div>
        {!! Form::label('event_end_ampm', 'AM/PM:', ['class' => 'col-sm-1']) !!}
        <div class="col-sm-2">
            {!! Form::select('event_end_ampm', array('AM' => 'a.m.', 'PM' => 'p.m.'), 'PM', ['class' => 'form-control']) !!}
        </div>
    </div>
    </div>
<div class="form-horizontal">
    <div class="col-sm-10 col-sm-offset-2" style="border-bottom: solid #999999 1px; margin-bottom: 2%;"></div>
</div>
<div class="form-horizontal">

    <div class="form-group">
        {!! Form::label('event_location', 'Venue:', ['class' => 'col-sm-2']) !!}
        <div class="col-sm-10">
        {!! Form::text('event_location', null, ['class' => 'form-control']) !!}
        </div>
    </div>

    <div class="form-group">
        {!! Form::label('event_city', 'City:', ['class' => 'col-sm-1 col-sm-offset-3']) !!}
        <div class="col-sm-2">
        {!! Form::select('event_city', array('2' => 'Tallahassee'), null, ['class' => 'form-control']) !!}
        </div>

        {!! Form::label('event_state', 'State:', ['class' => 'col-sm-1']) !!}
        <div class="col-sm-2">
        {!! Form::select('event_state', array(
        '1' => 'AL',
        '2' => 'AK',
        '3' => 'AZ',
        '4' => 'AR',
        '5' => 'CA',
        '6' => 'CO',
        '7' => 'CT',
        '8' => 'DE',
        '9' => 'DC',
        '10' => 'FL',
        '11' => 'GA',
        '12' => 'HI',
        '13' => 'ID',
        '14' => 'IL',
        '15' => 'IN',
        '16' => 'IA',
        '17' => 'KS',
        '18' => 'KY',
        '19' => 'LA',
        '20' => 'ME',
        '21' => 'MD',
        '22' => 'MA',
        '23' => 'MI',
        '24' => 'MN',
        '25' => 'MS',
        '26' => 'MO',
        '27' => 'MT',
        '28' => 'NE',
        '29' => 'NV',
        '30' => 'NH',
        '31' => 'NJ',
        '32' => 'NM',
        '33' => 'NY',
        '34' => 'NC',
        '35' => 'ND',
        '36' => 'OH',
        '37' => 'OK',
        '38' => 'OR',
        '39' => 'PA',
        '40' => 'RI',
        '41' => 'SC',
        '42' => 'SD',
        '43' => 'TN',
        '44' => 'TX',
        '45' => 'UT',
        '46' => 'VT',
        '47' => 'VA',
        '48' => 'WA',
        '49' => 'WV',
        '50' => 'WI',
        '51' => 'WY'
        ), '10', ['class' => 'form-control']) !!}
        </div>

        {!! Form::label('event_zip', 'Zip:', ['class' => 'col-sm-1']) !!}
        <div class="col-sm-2">
        {!! Form::text('event_zip', null, ['class' => 'form-control']) !!}
        </div>
    </div>

    <div class="form-group">
        {!! form::hidden('user_id', $user->user_id, [null]) !!}
        {!! Form::submit('Add Event', ['class' => 'btn btn-primary form-control']) !!}
    </div>
{!! Form::close() !!}

@if ($errors->any())
    <ul class="alert alert-danger">
    @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
    @endforeach
    </ul>
@endif
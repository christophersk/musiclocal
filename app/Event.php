<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'events';

    protected $primaryKey = 'event_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['creator_user_id', 'event_start', 'event_end', 'event_name', 'event_location', 'event_city', 'event_state', 'event_zip', 'event_country'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

    public function getDates()
    {
        return ['event_start', 'event_end'];
    }

    public function projects()
    {
        return $this->belongsToMany('App\Project');
    }

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function getEventStateAttribute($value)
    {
        $statearray = array(
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
        );

        return $statearray[$value];
    }

    public function getEventCityAttribute($value)
    {
        $cityarray = array(
            '1' => 'AL',
            '2' => 'Tallahassee',
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
        );

        return $cityarray[$value];
    }

}

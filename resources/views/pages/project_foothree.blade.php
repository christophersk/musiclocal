<html>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>

<body>
<br/><br/>
<div class="container container-fixed">
    <div class="row">
        <div class="col-sm-4 col-sm-offset-4">
            <form id="theform">
                <div class="form-group">
                    <label for="idinput">Enter your ID and press submit.</label>
                    <input type="text" class="form-control" id="idtextentry">
                </div>
                    <input type="submit" class="btn btn-primary"></input>
            </form>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-4 col-sm-offset-4">
            <p id="successfiller"></p>
        </div>
    </div>
</div>


<script>

    $("#theform").submit(function(event){
        alert("you clicked submit");
        event.preventDefault();
        var id = $("#idtextentry").val();
        $.ajax({
            type: "POST",
            url: "/test/foo",
            data: {
                "id": id
            },
            error: (function (response) {
                alert("there was the following error: " + response);
            }),
            success: (function (response) {
                $('#successfiller').html('The ID received by the server was "' + response + '"');
                alert("success with response: " + response);
            })
        })
    });

</script>

<script>

var first = prompt("what is your first name?");
var middle = prompt("What is your middle name?");
var last = prompt("what is your last name?");
function go(first,middle,last){
	if(first=="Frank") {
		alert("YOU ARE AWESOME!");
	}
	else {
		alert(first+ " "+middle+ " "+last);
	}
}
go (first,middle,last)

</script>

</body>

</html>

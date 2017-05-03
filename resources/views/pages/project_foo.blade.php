<html>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
</head>

<body>

<form id="theform">
    <input type="text" id="idtextentry">
    <p>enter your id then press submit</p>
    <input type="submit"></input>
</form>

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
                alert("success with response: " + response);
            })
        })
    });

</script>

</body>

</html>

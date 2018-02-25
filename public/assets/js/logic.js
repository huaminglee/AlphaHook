$(document).ready(function() {
    $("#userProfileForm").on("submit", function(event) {
      event.preventDefault();
      userProfile();
    });
    $("#userSurvey").on("submit", function(event) {
        event.preventDefault();
        userSurvey();
      });
});

function userProfile()
{
    var userProfile = {
        name: $("#name").val(),
        middleName: $("#mname").val(),
        lastName: $("#lname").val(),
        email: $("#mail").val(),
        dob:$("#dob").val()
    }
    console.log(userProfile);
    $.ajax({
      method: "POST",
      url: "/profile/create",
      data: userProfile
    })
    .then(function(data) {
      //console.log(data);
      $('html').html(data);
    });
}

function userSurvey()
{
    console.log($("#userSurvey"));
    var userSurvey ={answer3:[]};
    //single option questions
    $("#userSurvey" + ' input[type="radio"]').each(function() {
        if ($(this).is(":checked")) {
            console.log($(this).attr('name'));
            userSurvey[$(this).attr('name')] = $(this).attr('value');
            console.log(userSurvey);
        } else
        {
            console.log($(this).attr('name'));
        }
    });
    //multiple option questions
    $("#userSurvey" + ' input[type="checkbox"]').each(function() {
        if ($(this).is(":checked")) {
            console.log($(this).attr('name'));
            userSurvey[$(this).attr('name')][(userSurvey[$(this).attr('name')].length)] = $(this).attr('value'); // add an additional answer to the array based on the length of the array
            console.log(userSurvey);
        } else
        {
            userSurvey[$(this).attr('name')][(userSurvey[$(this).attr('name')].length)] = "0"; // add an additional answer to the array based on the length of the array
            console.log($(this).attr('name'));        }
    });
    console.log(userSurvey);
    $.ajax({
      method: "POST",
      url: "/survey/create",
      data: userSurvey
    })
    .then(function(data) {
      //console.log(data);
    //   $('html').html(data);
    });
}
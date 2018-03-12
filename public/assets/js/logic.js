console.log("new");
var counter;
var url = "/myProfile/" + localStorage.getItem("email");
var url1 = "/allprofiles/" + localStorage.getItem("email");
$(document).ready(function() {
    $("#userProfileForm").on("submit", function(event) {
        event.preventDefault();
        userProfile();
    });
    $("#userSurvey").on("submit", function(event) {
        event.preventDefault();
        userSurvey();
    });
    $(".signup").on("click", function(event) {
        counter = $("#username").val();
        localStorage.setItem("email", counter);
        url = "/myProfile/" + localStorage.getItem("email");
        url1 = "/allprofiles/" + localStorage.getItem("email");
    });
    $(".login").on("click", function(event) {
        counter = $("#username").val();
        localStorage.setItem("email", counter);
        url = "/myProfile/" + localStorage.getItem("email");
        url1 = "/allprofiles/" + localStorage.getItem("email");
    });
    $(".goalButton").on("click", function(event) {
        event.preventDefault();
        target= $(this).parent().parent().children().find( "p" )[0].innerHTML;
        goal= $(this).val();
        console.log(target);
        console.log(goal);
        getHooked(target, goal);
    });
    $('.loginButton').click(function() {
        window.location = "/login";
    });
    $('.searchButton').click(function() {
        window.location = url1;
    });
    $('.profileButton').click(function() {
        window.location = url;
    });
    $('.finishButton').click(function() {
        target= $(this).val();        
        finishCancel(1, target); //1 for finish goal
    });
    $('.cancelButton').click(function() {
        target= $(this).val();   
        finishCancel(0, target); //0 to delete goal
    });
});

function userProfile()
{   console.log(localStorage.getItem("email"));
    var userProfile = {
        name: $("#name").val(),
        middleName: $("#mname").val(),
        lastName: $("#lname").val(),
        email: localStorage.getItem("email"),
        dob:$("#dob").val(),
        counterItem: localStorage.getItem("email")
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
    var userSurvey ={answer3:[], counterItem: localStorage.getItem("email")};
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
      data: userSurvey,
      success: function(){
        window.location = url;
        }
    });
}

function getHooked(matchTarget, goalTarget)
{ 
    counter = $("#mail").val();
    var getHookedNow = {
        email: localStorage.getItem("email"),
        running: matchTarget,
        goal: parseInt(goalTarget),
        finished: false
    }
    console.log(userProfile);
    $.ajax({
        async: true,
      method: "POST",
      url: "/getHooked",
      data: getHookedNow,
      success: function(){
        window.location = url;
        }
    })
}


function finishCancel(action, actionMatch)
{
        var updateGoalNow = {
            email: localStorage.getItem("email"),
            running: actionMatch,
            whatToDo: action
        }
        $.ajax({
            async: true,
            method: "POST",
            url: "/updateGoals",
            data: updateGoalNow,
            success: function(){
                window.location = url;
            }
        })

}

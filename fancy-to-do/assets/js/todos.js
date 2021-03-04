var todoInput = $("input[type='text']");
var todoInputBlock = $('div .flex');
var toggleIcon = $("#toggleInput > i");

// Uncheck todos By Clicking (Short Way)
$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
});

//Removes todos from the li by clicking on the Bin
$("ul").on("click", "span", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    });
    event.stopPropagation();
});

//Put the input text in a li by pressing Enter
$(todoInput).keypress(function (event) {
    if ($(this).val() === "") {
        return;
    } else if (event.which === 13) {
        var todoText = $(this).val();
        //create a new li and add to ul
        $("ul").append("<li><span><i class='fas fa-trash'></i></span> " + todoText + "</li>");
        $(this).val("");
    }
})

//Put the input text in a li by clicking +
$('#container > div > span').click(function (event) {
    if ($(todoInput).val() === "") {
        return;
    } else {
        var todoText = $(todoInput).val();
        //create a new li and add to ul
        $("ul").append("<li><span><i class='fas fa-trash'></i></span> " + todoText + "</li>");
        $(todoInput).val("");
    }
});

//Hide the input by clicking - (it turns in + when collapsed)
$("#toggleInput").click(function () {
    $(todoInputBlock).fadeToggle(300, function () {
        if ($(toggleIcon).hasClass("fa-minus")) {
            toggleIcon.removeClass("fa-minus");
            toggleIcon.addClass("fa-plus");
        } else {
            toggleIcon.removeClass("fa-plus");
            toggleIcon.addClass("fa-minus");
        }
    })
});
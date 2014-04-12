$(function(){

    // Fixes anchor focus in Chrome/Safari/IE by setting the tabindex of the 
    // target container to -1 on click/enter
    // see -> http://stackoverflow.com/questions/3572843/skip-navigation-link-not-working-in-google-chrome/6188217#6188217

    $("a[href^='#']").click(function(evt){
        var anchortarget = $(this).attr("href");
        $(anchortarget).attr("tabindex", -1).focus();
    });

    // Fixes anchor focus in Chrome/Safari/IE by setting the tabindex of the 
    // target container to -1 on page load
    if (window.location.hash) {
        $(window.location.hash).attr("tabindex", -1).focus();
    }

    var hoverThis = function hoverThis(event) {
        var element = event.currentTarget;
        var nodeNumber = $(element).index();
        if (event.type == 'mouseover' || event.type == 'focusin') {
            $($(event.data)[nodeNumber]).addClass('hovered');
        } else {
            $($(event.data)[nodeNumber]).removeClass('hovered');
        }
        return false;
    }

    $('.projects.magicHover').on('mouseover focusin', '.project', '.menu li a', hoverThis);
    $('.projects.magicHover').on('mouseout focusout', '.project', '.menu li a', hoverThis);
    $('.menu.magicHover').on('mouseover focusin', 'li', '.projects .project', hoverThis);
    $('.menu.magicHover').on('mouseout focusout', 'li', '.projects .project', hoverThis);
});

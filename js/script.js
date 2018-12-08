function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie()
{
    var nightmode = getCookie("nightmode");
    if (nightmode != "")
    {
        return nightmode;
    } else
    {
        setCookie("nightmode", "false", 30);
        return "false";
    }
}

function nightmodeOn()
{
	setCookie("nightmode", "true", 30);
	$('body').addClass('dark');
	$('.fb-comments[data-colorscheme="light"]').addClass("hidden");
	$('.fb-comments[data-colorscheme="dark"]').removeClass("hidden");
}

function nightmodeOff()
{
	setCookie("nightmode", "false", 30);
	$('body').removeClass('dark');
	$('.fb-comments[data-colorscheme="light"]').removeClass("hidden");
	$('.fb-comments[data-colorscheme="dark"]').addClass("hidden");
}

function nightmodeToggle()
{
	if ($('body').hasClass('dark'))
	{
		nightmodeOff();
	}else
	{
		nightmodeOn();
	}
}

$(function(){
	var nightmode = getCookie("nightmode");
	nightmode = (nightmode=="true")? true:false;
	if (nightmode) {
		nightmodeOn();
	}

	$('.switch').on("click", function(){
		nightmodeToggle();
	});

	$('.menu.toggle').click(function(){
		if (!$('.menu.toggle').hasClass("active")) 
		{
			$('body').animate({left:"-200px"},200);
			$('.menu.list').animate({right:"0px"},200);
			$('.menu.toggle .icon').attr("class", "right arrow icon");
			$('.menu.toggle').toggleClass("active");
			$('body').addClass("no-scroll");
			$('.overlay').css('display','block');
		}else
		{
			$('body').animate({left:"0px"},200);
			$('.menu.list').animate({right:"-200px"},200);
			$('.menu.toggle .icon').attr("class", "menu icon");
			$('.menu.toggle').toggleClass("active");
			$('body').removeClass("no-scroll");
			$('.overlay').css('display','none');
		}
	});

	$(".swipe-area").swipe(
		{
			swipeStatus:function(event, phase, direction, distance, duration, fingers)
			{
				if (phase=="move" && direction =="left" && !($('.menu.toggle').hasClass('active')))
				{
					$('.menu.toggle').trigger("click");
					return false;
				}
			}
		}
	);

	$(".overlay").click(function(){
		if ($('.menu.toggle').hasClass("active"))
		{
			$('.menu.toggle').trigger("click");
			return false;
		}
	});
	$(".overlay").swipe(
		{
			swipeStatus:function(event, phase, direction, distance, duration, fingers)
			{
				if (phase=="move" && direction =="right" && ($('.menu.toggle').hasClass('active')))
				{
					$('.menu.toggle').trigger("click");
					return false;
				}
			}
		}
	);

});
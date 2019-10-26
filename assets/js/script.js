$(document).ready(function() {
	var isshow = localStorage.getItem('isshow');
	
	if (isshow == null) {
		localStorage.setItem('isshow', 1);

		$('.overlay').show();
	} else {
		$('body').css('overflow', 'visible')
		$('.overlay').css('display', 'none');
		$('.overlay-2').css('display', 'none');
	}
});

// Introduction

function fadeOut() {

	TweenMax.to(".intro-btn", 1, {
		y: -100,
		opacity: 0
	});

	TweenMax.to(".screen", 2, {
		y: -400,
		opacity: 0,
		ease: Power2.easeInOut,
		delay: 2
	});

	TweenMax.from(".overlay", 2, {
		ease: Power2.easeInOut
	});

	TweenMax.to(".overlay", 2, {
		delay: 2.6,
		top: "-110%",
		ease: Expo.easeInOut
	});

	TweenMax.to(".overlay-2", 2, {
		delay: 3,
		top: "-110%",
		ease: Expo.easeInOut
	});
}

var bodyElement = document.querySelector('body');
var warnElement = document.querySelector('#unofficial-header');
var headerElement = document.querySelector('.header-bg');
var leftMenuElement = document.querySelector('.menu-left');

// Header

if (window.screen.availWidth > 983) {
	headerElement.style.position = "sticky";
	headerElement.style.top = "32px";
	headerElement.style.width = "100%";

	var prevScrollpos = window.pageYOffset;

	window.onscroll = function() {
		var currentScrollpos = window.pageYOffset;

		if (prevScrollpos > currentScrollpos) {			
			if (currentScrollpos == 0 && warnElement.style.display != "none") {
				headerElement.style.top = "32px";
			} else {
				headerElement.style.top = "0px";
			}
			
			leftMenuElement.style.top = "105px";	
		} else {
			headerElement.style.top = "-73px";
			leftMenuElement.style.top = "0px";
		}

		prevScrollpos = currentScrollpos;
	}
}

// Enable scroll (after introduction)

function enableScroll() {
	bodyElement.style.overflow = "visible";
}

// Close unofficial header box

function closeBox() {
	warnElement.style.display = "none";
	headerElement.style.top = "0px";

	// Adapt synopsis title
	if (window.screen.availWidth >= 1220) {
		document.querySelector('#title-synopsis').style.top = "118px";
	} else if (window.screen.availWidth < 1220 && window.screen.availWidth >= 983) {
		document.querySelector('#title-synopsis').style.top = "98px";
	} else if (window.screen.availWidth < 983 && window.screen.availWidth >= 770) {
		document.querySelector('#title-synopsis').style.top = "90px";
	}
}

// Fullscreen menu for mobile devices

var mobileButton = document.querySelector('#burger-menu');
var fullscreenMenu = document.querySelector('.fullscreen-menu');
var fullscreenList = document.querySelector('.fullscreen-menu ul');

function fullScreenMenu() {
	if (mobileButton.checked == true && window.screen.availWidth <= 983) {
		fullscreenMenu.style.height = '100vh';
		fullscreenList.style.opacity = '1';
		fullscreenList.style.visibility = 'visible';
		bodyElement.style.overflow = "hidden";
	} else {
		fullscreenMenu.style.height = '0vh';
		fullscreenList.style.opacity = '0';
		fullscreenList.style.visibility = 'hidden';
		bodyElement.style.overflow = "visible";
	}
}

function closeFullscreen() {
	fullscreenMenu.style.height = '0vh';
	fullscreenList.style.opacity = '0';
	fullscreenList.style.visibility = 'hidden';
	bodyElement.style.overflow = "visible";

	mobileButton.checked = false;
}


// Scroll to section

$('.menu-item').click(function(e) {
   e.preventDefault();
	var id = $(this).attr('href'),
		targetOffSet = $(id).offset().top;

	$('html, body').animate({
		scrollTop: targetOffSet -50
	}, 500);
});

$(document).ready(function () {
    $('.go-to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.info('registered sw', reg))
    .catch(err => console.error('error registering sw', err));
}
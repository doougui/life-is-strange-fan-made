const $ = element => document.querySelector(element);
const $l = element => document.querySelectorAll(element);

// Introduction

function displayIntro() {
	if (!localStorage.getItem('intro-displayed')) {
		saveToStorage();

		$('.overlay').style.display = 'block';
	} else {
		$('body').style.overflow = 'visible';
		$('.overlay').style.display = 'none';
		$('.overlay-2').style.display = 'none';
	}
}

function saveToStorage() {
	localStorage.setItem('intro-displayed', true);
}

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

// Header

const bodyElement = $('body');
const warnElement = $('#unofficial-header');
const headerElement = $('.header-bg');
const leftMenuElement = $('.menu-left');

function setMenuPosition() {
	let prevScrollpos = window.pageYOffset;

	window.addEventListener('scroll', () => {
		let currentScrollpos = window.pageYOffset;

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
	});
}

function setDesktopHeader() {
	headerElement.style.position = "sticky";
	headerElement.style.top = "32px";
	headerElement.style.width = "100%";

	setMenuPosition();
}

if (window.screen.availWidth > 983) {
	setDesktopHeader();
}

// Enable scroll (after introduction)

function enableScroll() {
	bodyElement.style.overflow = "visible";
}

// Close unofficial header box

function closeUnofficialHeader() {
	warnElement.style.display = "none";
	headerElement.style.top = "0px";

	adaptSynopsisTitle();
}

function adaptSynopsisTitle() {
	if (window.screen.availWidth >= 1220) {
		$('#title-synopsis').style.top = "118px";
	} else if (window.screen.availWidth < 1220 && window.screen.availWidth >= 983) {
		$('#title-synopsis').style.top = "98px";
	} else if (window.screen.availWidth < 983 && window.screen.availWidth >= 770) {
		$('#title-synopsis').style.top = "90px";
	}
}

// Fullscreen menu for mobile devices

const mobileButton = $('#burger-menu');
const fullscreenMenu = $('.fullscreen-menu');
const fullscreenList = $('.fullscreen-menu ul');

function openFullscreenMenu() {
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

function closeFullscreenMenu() {
	fullscreenMenu.style.height = '0vh';
	fullscreenList.style.opacity = '0';
	fullscreenList.style.visibility = 'hidden';
	bodyElement.style.overflow = "visible";

	mobileButton.checked = false;
}

// Scroll to section

function getScrollTopByHref(element) {
	const id = element.getAttribute('href');
	return $(id).offsetTop;
}

function getTargetPosition(target) {
	const to = getScrollTopByHref(target) - 72;
	scrollToPosition(to);
}

function scrollToPosition(to = 0) {
	window.scroll({
		top: to,
		behavior: 'smooth'
	});
}

// Listeners

window.addEventListener('load', displayIntro);
$('#close-box').addEventListener('click', closeUnofficialHeader);
$('#burger-menu').addEventListener('click', openFullscreenMenu);

$l('.menu-item[href^="#"]').forEach(item => item.addEventListener('click', event => {
	event.preventDefault();

	if (item.closest('nav').classList.contains('fullscreen-menu')) {
		closeFullscreenMenu();
	}

	getTargetPosition(event.target);
}));

$('.go-to-top').addEventListener('click', scrollToPosition);

$('.intro-btn').addEventListener('click', () => {
	fadeOut();
	setTimeout(enableScroll, 2800);
});

// Service Worker

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./service-worker.js')
		.then(reg => console.info('registered sw', reg))
		.catch(err => console.error('error registering sw', err));
}
const c = element => document.querySelector(element);
const cs = element => document.querySelectorAll(element);

// Introduction

function displayIntro() {
	if (!localStorage.getItem('intro-displayed')) {
		saveToStorage();

		c('.overlay').style.display = 'block';
	} else {
		c('body').style.overflow = 'visible';
		c('.overlay').style.display = 'none';
		c('.overlay-2').style.display = 'none';
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

const bodyElement = c('body');
const warnElement = c('#unofficial-header');
const headerElement = c('.header-bg');
const leftMenuElement = c('.menu-left');

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
		c('#title-synopsis').style.top = "118px";
	} else if (window.screen.availWidth < 1220 && window.screen.availWidth >= 983) {
		c('#title-synopsis').style.top = "98px";
	} else if (window.screen.availWidth < 983 && window.screen.availWidth >= 770) {
		c('#title-synopsis').style.top = "90px";
	}
}

// Fullscreen menu for mobile devices

const mobileButton = c('#burger-menu');
const fullscreenMenu = c('.fullscreen-menu');
const fullscreenList = c('.fullscreen-menu ul');

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
	return c(id).offsetTop;
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
c('#close-box').addEventListener('click', closeUnofficialHeader);
c('#burger-menu').addEventListener('click', openFullscreenMenu);

cs('.menu-item[href^="#"]').forEach(item => item.addEventListener('click', event => {
	event.preventDefault();

	if (item.closest('nav').classList.contains('fullscreen-menu')) {
		closeFullscreenMenu();
	}

	getTargetPosition(event.target);
}));

c('.go-to-top').addEventListener('click', scrollToPosition);

c('.intro-btn').addEventListener('click', () => {
	fadeOut();
	setTimeout(enableScroll, 2800);
});

// Service Worker

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./service-worker.js')
		.then(reg => console.info('registered sw', reg))
		.catch(err => console.error('error registering sw', err));
}
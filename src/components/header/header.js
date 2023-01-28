
document.querySelector('.header__burger').addEventListener('click', function(e) {
	e.preventDefault();
	e.target.closest('.header__burger').classList.toggle('is-active')
	document.querySelector('.main-menu').classList.toggle("is-open");
});

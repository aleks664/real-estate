import {slideDown, slideUp} from "../../base/js";

const txtSlideToggle = [...document.querySelectorAll('.js-slide-toggle')];

txtSlideToggle.map(link =>  {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		let txtHidden = document.querySelector(link.getAttribute('href'))
		if (!txtHidden) return;
		link.classList.toggle('is-active');
		let txtLnk = link.classList.contains('is-active') ? 'Скрыть': 'Подробнее'
		link.querySelector('span').textContent = txtLnk;
		if (link.classList.contains('is-active')) {
			slideDown(txtHidden)
		} else {
			slideUp(txtHidden)
		}
	});
});

document.querySelector('.section-indicators__button').addEventListener('click', function(e) {
	e.preventDefault();
	let indicator = document.querySelector('.section-indicators__indicator .indicator-box__value');
	let width = Number(indicator.dataset.width) + Number(e.target.dataset.max);
	console.log(width)
	if (width >= 100) {
		width = 100;
		e.target.disabled = true;
	}
	indicator.dataset.width = width;
	indicator.textContent = width+'%';
	indicator.style.width = width+'%';
	console.log(width)
});

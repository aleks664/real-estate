import {slideDown} from "../../base/js";
import {slideUp} from "../../base/js";
const lnksSubmenu = [...document.querySelectorAll('.js-open-submenu'),]

lnksSubmenu.map(link =>  {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		let submenu = e.target.closest('.main-menu__itm').querySelector('.main-menu__submenu');
		e.target.closest('.js-open-submenu').classList.toggle('is-active');
		if (window.screen.width > 767) {
			submenu.classList.toggle("is-open");
		} else {
			if (e.target.closest('.js-open-submenu').classList.contains('is-active')) {
				slideDown(submenu)
			} else {
				slideUp(submenu)
			}
		}
	});
})

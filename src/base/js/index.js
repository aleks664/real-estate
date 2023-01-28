export let slideUp = (target, duration=500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout( () => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		//alert("!");
	}, duration);
}

export let slideDown = (target, duration=500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;

	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout( () => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
}

class CustomSelect extends HTMLElement {
	constructor() {
		super();
		this.head = this.querySelector('.custom-select__head');
		this.select = this.querySelector('select');
		this.build();
		this.list = this.querySelector('.custom-select__list');
		this.head.addEventListener('click', this.toggleList.bind(this));
		document.addEventListener('click', this.close.bind(this));
		this.list.addEventListener('click', this.change.bind(this));
	}

	build() {
		let list = '<ul class="custom-select__list">';
		if (this.select.hasAttribute('placeholder') ) {
			let placeholder = '<div class="custom-select__placeholder">'+this.select.getAttribute('placeholder')+'</div>';
			this.head.insertAdjacentHTML( 'beforeend', placeholder );
			this.placeholder = this.head.querySelector('.custom-select__placeholder')
		}
		for(var i=0; i < this.select.options.length; i++) {
			if (this.select.options[i].text !== '') {
				list += '<li class="custom-select__itm"><span class="custom-select__txt">'+this.select.options[i].text+'</span></li>'
			}
		}
		list += '</ul>';
		this.insertAdjacentHTML( 'beforeend', list );
	}

	toggleList(e) {
		let head = e.target.closest('.custom-select__head');
		let list = e.target.closest('.custom-select').querySelector('.custom-select__list');
		if (e.target.closest('.custom-select') && e.target.closest('.custom-select__head')) {
			head.classList.toggle('is-open');
			if (head.classList.contains('is-open')) {
			 	slideDown(list)
			 } else {
			 	slideUp(list)
			 }
		}
	}

	close(e) {
		if (!e.target.closest('.custom-select')) {
			this.head.classList.remove('is-open');
			slideUp(this.list)
		}
	}

	change(e) {

		if (this.placeholder) {
			this.placeholder.remove()
		}
		if (e.target.closest('.custom-select__itm')) {
			for(var i=0; i < this.select.options.length; i++) {
				if (this.select.options[i].text === e.target.textContent) {
					this.select.options[i].selected = true;
					this.head.classList.remove('is-open');
					slideUp(this.list)
				}
			}
		}

	}
}

customElements.define('custom-select', CustomSelect);
import '../../components/main-menu/main-menu'
import '../../components/header/header'
import '../../components/section-carousel/section-carousel'
import '../../components/section-indicators/section-indicators'
import '../../components/section-map/section-map'

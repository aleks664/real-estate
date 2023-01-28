import Swiper, {Navigation, Pagination} from 'swiper';

const swiper = new Swiper('.section-carousel__swiper', {
	modules: [Navigation, Pagination],
	slidesPerView: 3,
	spaceBetween: 30,
	loop: true,
	navigation: {
		nextEl: ".section-carousel__swiper-button-next",
		prevEl: ".section-carousel__swiper-button-prev",
	},
	pagination: {
		el: '.section-carousel__swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0
		},

		768: {
			slidesPerView: 2.8,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 2.8,
			spaceBetween: 30,
		}
	}
});

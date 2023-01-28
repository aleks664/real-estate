const script = document.createElement('script');

document.body.appendChild(script);
script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=e1c2b193-edfc-446f-b034-3c6048d70037';
script.onload = function () {
	ymaps.ready(function () {init()});
};


function init() {
	var myMap = new ymaps.Map('map', {
			center: [59.928194,30.346644],
			zoom: 15,
			controls: []
		}),

		MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
			'<div class="balloon">' +
			'<div class="balloon__inner">' +
			'$[[options.contentLayout observeSize minWidth=310 maxWidth=310 maxHeight=300]]' +
			'</div>' +
			'<div class="balloon__arrow"></div> ' +
			'</div>', {
				/**
				 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
				 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
				 * @function
				 * @name build
				 */
				build: function () {
					this.constructor.superclass.build.call(this);
					this._$element = document.querySelector('.balloon') ;
					this.applyElementOffset();
				},

				/**
				 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
				 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
				 * @function
				 * @name onSublayoutSizeChange
				 */
				onSublayoutSizeChange: function () {
					MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

					if(!this._isElement(this._$element)) {
						return;
					}

					this.applyElementOffset();

					this.events.fire('shapechange');
				},

				/**
				 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
				 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
				 * @function
				 * @name applyElementOffset
				 */
				applyElementOffset: function () {
					this._$element.style.bottom = 0;
					this._$element.style.left = 0;
				},

				/**
				 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
				 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
				 * @function
				 * @name onCloseClick
				 */
				onCloseClick: function (e) {
					e.preventDefault();
					this.events.fire('userclose');
				},

				/**
				 * Используется для автопозиционирования (balloonAutoPan).
				 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
				 * @function
				 * @name getClientBounds
				 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
				 */
				getShape: function () {
					if(!this._isElement(this._$element)) {
						return MyBalloonLayout.superclass.getShape.call(this);
					}
					return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
						[0, 0], [
							this._$element.offsetWidth,
							this._$element.offsetHeight
						]
					]));
				},

				/**
				 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
				 * @function
				 * @private
				 * @name _isElement
				 * @param {jQuery} [element] Элемент.
				 * @returns {Boolean} Флаг наличия.
				 */
				_isElement: function (element) {
					return element ;
				}
			}),

		// Создание вложенного макета содержимого балуна.
		MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
			'<h5>$[properties.balloonHeader]</h5>' +
			'<div class="balloon__content">$[properties.balloonContent]</div>'
		),

		myPlacemark = window.myPlacemark = new ymaps.Placemark([59.928194,30.346644], {
			balloonHeader: 'Наш адрес',
			balloonContent: 'Санкт-Петербург, Владимирский проспект, 23, лит. А, офис 701 <br><br> <a href="#" target="_blank">Схема проезда</a>'
		}, {
			balloonShadow: false,
			balloonLayout: MyBalloonLayout,
			balloonContentLayout: MyBalloonContentLayout,
			balloonPanelMaxMapArea: 0

		});


	myMap.geoObjects.add(myPlacemark);
	myPlacemark.balloon.open();

}

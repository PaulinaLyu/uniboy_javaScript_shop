import { getData } from './getData.js';
import userData from './userData.js';

const sendData = async (url, data) => {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url}, статус ошибка ${response.status}`);
	}
	return await response.json();
};

const sendCart = () => {
	const cartForm = document.querySelector('.cart-form');
	
	cartForm.addEventListener('submit', event => {
		event.preventDefault();

		const formData = new FormData(cartForm);
		const data = {};

		for (const [key, value] of formData) {
			data[key] = value;
		}

		data.order = userData.cartList;

		sendData('https://jsonplaceholder.typicode.com/posts', JSON.stringify(data))
			.then(() => {
				cartForm.reset();
			})
			.catch((err) => {
				console.log(err);
			})
	});
};

const createCartPage = () => {

	if (location.pathname.includes('cart')) {
		const cartList = document.querySelector('.cart-list');
		const cartTotalPrice = document.querySelector('.cart-total-price');

		const renderCartList = (data) => {
			cartList.textContent = '';
			let totalPrice = 0;

			data.forEach(({ name: itemName, id, img, price, description, count }) => {
				let options = '';
				let countUser = userData.cartList.find(item => item.id === id).count;

				if (countUser > count) {
					countUser = count
				}

				for (let i = 1; i <= count; i++) {
					options += `
						<option value=${i} ${countUser === i ? 'selected' : ''}>${i}</option>`
				}

				totalPrice += countUser * price;

				cartList.insertAdjacentHTML('beforeend', `
					<li class="cart-item">
						<div class="product">
							<div class="product__image-container">
								<img src=${img[0]}
									alt="${itemName} - ${description}">
							</div>
							<div class="product__description">
								<h3 class="product__name">
									<a href="card.html#${id}">${itemName}</a></h3>
								<p class="product_description-text">${description}</p>
							</div>
							<div class="product__prices">
								<div class="product__price-type product__price-type-regular">
									<div>
										<div class="product__total product__total-regular">${price*countUser}.-</div>
										${countUser > 1 ? 
											`<div class="product__price-regular">${price}.-</div>` : ''
										}
									</div>
								</div>
							</div>
							<div class="product__controls">
								<div class="product-controls__remove">
									<button type="button" class="btn btn-remove" data-idd=${id}>
										<svg id="Trash" enable-background="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"/><path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/></g></svg>
									</button>
								</div>
								<div class="product-controls__quantity">
									<select title="Выберите количество" aria-label="Выберите количество" data-idd=${id}>
										${options}
									</select>
								</div>
							</div>
						</div>
					</li>
				`);

			});
			cartTotalPrice.textContent = totalPrice;
		}

		cartList.addEventListener('change', event => {
			userData.changeCountCartList = {
				id: event.target.dataset.idd,
				count: parseInt(event.target.value)
			};
			getData.cart(userData.cartList, renderCartList);	
		});

		cartList.addEventListener('click', event => {
			const btnRemove = event.target.closest('.btn-remove');
			if (btnRemove) {
				userData.deleteItemCart = btnRemove.dataset.idd;
				getData.cart(userData.cartList, renderCartList);
			}
		});

		getData.cart(userData.cartList, renderCartList);
		sendCart();
	}
};

export default createCartPage;
import { getData } from './getData.js';
import userData from './userData.js';

const COUNTER = 6;

const createGoodsPage = () => {
	const mainHeader = document.querySelector('.main-header');

	const createCards = (data) => {
		const goodsList = document.querySelector('.goods-list');

		goodsList.textContent = '';
		if (!data.length) {
			const goods = document.querySelector('.goods');
			goods.textContent = location.search === '?wishlist' ?
				'Список желаний пуст' :
				'К сожалению ничего не найдено';
		}
		
		data.forEach(({ name: itemName, count, description, id, img, price }) => {

			goodsList.insertAdjacentHTML('afterbegin', `
				<li class="goods-list__item">
					<a class="goods-item__link" href="card.html#${id}">
						<article class="goods-item">
							<div class="goods-item__img">
			
							<img src=${img[0]}
								alt=${itemName}>
							</div>
							${count >= COUNTER ? '<p class="goods-item__new">Новинка</p>' : ''}
							${!count ? '<p class="goods-item__new">Нет в наличии</p>' : ''}
							<h3 class="goods-item__header">${itemName}</h3>
							<p class="goods-item__description">${description}</p>
							<p class="goods-item__price">
								<span class="goods-item__price-value">${price}</span>
								<span class="goods-item__currency"> ₽</span>
							</p>
							<button class="btn btn-add-card" 
								aria-label="Добравить" 
								data-idd="${id}">
								<svg focusable="false" class="svg-icon btn-add-card-svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
									xmlns="http://www.w3.org/2000/svg" style="display: block;">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M10.9994 4H10.4373L10.1451 4.48017L6.78803 9.99716H3.00001H1.71924L2.02987 11.2397L3.65114 17.7248C3.98501 19.0603 5.18497 19.9972 6.56157 19.9972L17.4385 19.9972C18.8151 19.9972 20.015 19.0603 20.3489 17.7248L21.9702 11.2397L22.2808 9.99716H21H17.2113L13.8539 4.48014L13.5618 4H12.9997H12.0004H10.9994ZM14.8701 9.99716L12.4376 6H12.0004H11.5615L9.12921 9.99716H14.8701ZM5.59142 17.2397L4.28079 11.9972H19.7192L18.4086 17.2397C18.2973 17.6849 17.8973 17.9972 17.4385 17.9972L6.56157 17.9972C6.1027 17.9972 5.70272 17.6849 5.59142 17.2397Z"></path>
								</svg>
							</button>	
						</article>
					</a>
				</li>
			`);
		});


		const checkCartList = () => {
			if (userData.cartList.includes(id)) {
				btnGood.classList.add('contains-cartlist');
			} else {
				btnGood.classList.remove('contains-cartlist');
			}
		};

		goodsList.addEventListener('click', event => {
			const btnAddCard = event.target.closest('.btn-add-card');
			if (btnAddCard) {
				event.preventDefault();
				userData.cartList = btnAddCard.dataset.idd;
			}
		});
	};

	if (location.pathname.includes('goods') && location.search) {
		const search = decodeURI(location.search);
		const prop = search.split('=')[0].substring(1);
		const value = search.split('=')[1];

		if (prop === 's') {
			getData.search(value, createCards);
			mainHeader.textContent = `Поиск: ${value}`;
		} else if (prop === 'wishlist') {
			getData.wishList(userData.wishList, createCards);
			mainHeader.textContent = `Список желаний`;
		} else if (prop === 'cat' || prop === 'subcat') {
			getData.category(prop, value, createCards);
			mainHeader.textContent = value;
		}
	}
};

export default createGoodsPage

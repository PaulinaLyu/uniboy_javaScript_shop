import { getData } from './getData.js';
import userData from './userData.js';

const NEW_COUNT_ITEM = 6;

const createItemPage = () => {

	const renderCard = ({ category, count, description, id, img, price, name: itemName, subcategory }) => {

		const goodImages = document.querySelector('.good-images'),
			goodItemNew = document.querySelector('.good-item__new'),
			goodItemHeader = document.querySelector('.good-item__header'),
			goodItemDescription = document.querySelector('.good-item__description'),
			goodItemEmpty = document.querySelector('.good-item__empty'),
			goodItemPriceValue = document.querySelector('.good-item__price-value'),
			btnGood = document.querySelector('.btn-good'),
			btnAddWishlist = document.querySelector('.btn-add-wishlist'),
			breadcrumbLink = document.querySelectorAll('.breadcrumb__link');

		const arr = [category, subcategory, itemName];
		breadcrumbLink.forEach((item, index) => {
			item.textContent = arr[index];
			if (index < 1) {
				item.href = `goods.html?cat=${arr[index]}`
			} else {
				item.href = `goods.html?subcat=${arr[index]}`
			}
			
		});

		goodImages.textContent = '';
		goodItemHeader.textContent = itemName;
		goodItemDescription.textContent = description;
		goodItemPriceValue.textContent = price;
		btnGood.dataset.idd = id;
		btnAddWishlist.dataset.idd = id;

		img.forEach(item => {
			goodImages.insertAdjacentHTML('beforeend',`
				<div class="good-image">
					<div class="good-image__item">
						<a href="#nogo"><img src="${item}" alt="${itemName} - ${description}" class="resize" />
							<span>
								<img src="${item}" alt="${itemName} - ${description}" />
							</span>
						</a>
					</div>
				</div>
			`);
		});

		if (count >= NEW_COUNT_ITEM) {
			goodItemNew.style.display = 'block';
		} else if (!count) {
			goodItemEmpty.style.display = 'block';
			btnGood.style.display = 'none';
		}

		const checkWishList = () => {
			if (userData.wishList.includes(id)) {
				btnAddWishlist.classList.add('contains-wishlist');
			} else {
				btnAddWishlist.classList.remove('contains-wishlist');
			}
		};

		btnAddWishlist.addEventListener('click', () => {
			userData.wishList = id;
			console.log(userData.wishList);
			checkWishList();
		});

		btnGood.addEventListener('click', () => {
			userData.cartList = id;
		});
		
		checkWishList();
	};

	if (location.hash && location.pathname.includes('card')) {
		getData.item(location.hash.substring(1), renderCard);
	}
};

export default createItemPage;
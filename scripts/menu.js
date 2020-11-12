import { getData } from './getData.js';
import createSubMenu from './createSubMenu.js';

const menu = () => {
	const updateSubCatalog = createSubMenu();
	const burger = document.querySelector('.btn-burger'),
	menu = document.querySelector('.menu'),
	subMenu = document.querySelector('.submenu'),
	subMenuHeader = document.querySelector('.submenu-header'),
	btnReturn = document.querySelector('.btn-return');

	const overlay = document.createElement('div');
	overlay.classList.add('overlay');
	document.body.append(overlay);

	const openMenu = () => {
		menu.classList.add('open');
		overlay.classList.add('active');
	};

	const closeMenu = () => {
		closeSubMenu();
		menu.classList.remove('open');
		overlay.classList.remove('active');
	};

	const handlerMenu = event => {
		event.preventDefault();
		const target = event.target;
		const itemList = event.target.closest('.menu-list__item');
		if (itemList) {
			getData.subCatalog(target.textContent, (data) => {
				updateSubCatalog(target.textContent, data)
				subMenu.classList.add('subopen');
			});
		}

		if(event.target.closest('.btn-close')) {
			closeMenu();
		}
	};

	const closeSubMenu = () => {
		subMenu.classList.remove('subopen');
	}

	burger.addEventListener('click', openMenu);
	overlay.addEventListener('click', closeMenu);
	menu.addEventListener('click', handlerMenu);
	subMenu.addEventListener('click', event => {
		const btnReturn = event.target.closest('.btn-return');
		if(burger) closeSubMenu();
	})

	document.addEventListener('keydown', event => {
		if(event.code === 'Escape') {
			closeMenu();
		};
	});

};

export default menu;
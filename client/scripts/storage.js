export const getLocalStorage = key => {
	return localStorage.getItem(key) ?
	JSON.parse(localStorage.getItem(key)) : 
	[];
};

export const setLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorageItem = (key) => {
	localStorage.removeItem(key);
}
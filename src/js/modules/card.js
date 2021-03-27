export default class Card {
    constructor(data, classicWrapperSelector, brandedWrapperSelector) {
        this.classicWrapper = document.querySelector(classicWrapperSelector);
        this.brandedWrapper = document.querySelector(brandedWrapperSelector);
        this.data = data;
    }

    createCards() {
            this.data.forEach(item => {
                let elem = `
                <div class="card ${item.type} ${item.category} ${item.ingredients}">
                    <div class="card__wrapper card__wrapper_hover">
                        <div class="card__labels">
                        </div>
                        <div class="card__img">
                            <img src="${item.img}" alt="item-1">
                        </div>
                        <div class="card__inner-wrapper">
                            <div class="card__block">
                                <div class="card__name">${item.name}</div>
                                <div class="card__details">
                                    <div class="card__category">
                                        <img src="icons/filter/${item.category}.png" alt="vega">
                                        Вега
                                    </div>
                                </div>
                            </div>
                            <p class="card__descr">${item.description}</p>
                            <div class="card__weight">${item.weight} г</div>
                            <div class="card__counts">
                                <button class="card__counts-item card__counts-item_active">5 шт</button>
                                <button class="card__counts-item">10 шт</button>
                            </div>
                                <div class="card__price_old">${item.oldPrice} ₽</div>
                                <div class="card__order">
                                    <div class="card__price">${item.price} ₽</div>
                                    <div class="card__buttons">
                                    <button class="card__buttons_sm card__button-remove">
                                        <svg width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.60254 2.42627H10.5337C11.0605 2.42627 11.5176 1.96924 11.5176 1.42334C11.5176 0.877441 11.0605 0.42041 10.5337 0.42041H1.60254C1.10107 0.42041 0.618652 0.877441 0.618652 1.42334C0.618652 1.96924 1.10107 2.42627 1.60254 2.42627Z" fill="#1A1A1A"/>
                                        </svg>
                                    </button>
                                    <div class="card__buttons-count">1</div>
                                    <button class="card__buttons_sm card__button_sm card__button-add">
                                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 11.9331C6.0459 11.9331 6.50293 11.457 6.50293 10.9492V7.42627H9.9624C10.4893 7.42627 10.9463 6.96924 10.9463 6.42334C10.9463 5.87744 10.4893 5.42041 9.9624 5.42041H6.50293V1.89746C6.50293 1.37061 6.0459 0.919922 5.5 0.919922C4.9541 0.919922 4.49707 1.37061 4.49707 1.89746V5.42041H1.03125C0.529785 5.42041 0.0473633 5.87744 0.0473633 6.42334C0.0473633 6.96924 0.529785 7.42627 1.03125 7.42627H4.49707V10.9492C4.49707 11.457 4.9541 11.9331 5.5 11.9331Z" fill="#1A1A1A"/>
                                        </svg>
                                    </button>
                                </div>
                                <button class="card__button">Беру!</button>
                            </div>
                        </div>
                    </div>
                </div>`;
                if (item.new) {
                    elem = elem.replace(/"card__labels">/, '"card__labels"> <div class="card__labels-item card__labels-item_new">NEW</div>')
                }
                if (item.hit) {
                    elem = elem.replace(/"card__labels">/, '"card__labels"> <div class="card__labels-item card__labels-item_hit">ХИТ</div>')
                }
                if (!item.branded) {
                    this.classicWrapper.insertAdjacentHTML('beforeEnd', elem);
                } else {
                    this.brandedWrapper.insertAdjacentHTML('beforeEnd', elem);
                }
        });
    }
    toggleCounts() {
        const toggleBtn = document.querySelectorAll('.card__counts-item');
        console.log(toggleBtn);
    }
    init() {
        this.createCards();
        this.toggleCounts();
    }
}
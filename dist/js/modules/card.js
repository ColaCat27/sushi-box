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
                    <div class="card__wrapper">
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
                                <button class="card__counts-item popup__counts-item_active">5 шт</button>
                                <button class="card__counts-item">10 шт</button>
                            </div>
                            <div class="card__price_old">${item.oldPrice} ₽</div>
                            <div class="card__order">
                                <div class="card__price">${item.price} ₽</div>
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
}
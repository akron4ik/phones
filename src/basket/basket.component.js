import {BaseComponent} from "../shared/components/base/base.component.js";

export class BasketComponent extends BaseComponent{

    constructor({element}){
        super({element});
    };
    show(phone, count){
        this._phone = phone;
        this._render(count);
        super.show();
    }

    _render(count) {
        let images = [];
        let phone = this._phone;
        this._phone.images.forEach((img) => images.push(`<li><img src=${img}></li>`));
        this._element.innerHTML = `
        
    <img class="phone" src=${this._phone.images[0]}>
    <h1>${phone.name}</h1>

    <p>${phone.description}</p>

    <ul class="phone-thumbs">
    
    ${images.join('')}
    
    </ul>
    
    <h1>${count} шт.</h1>
        
        `

    }
}
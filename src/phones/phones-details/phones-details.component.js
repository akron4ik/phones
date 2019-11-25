import {BaseComponent} from "../../shared/components/base/base.component.js";

export class PhonesDetailsComponent extends BaseComponent {
    constructor({element}) {
        super({element});
        this
            .on('click', '.phone-thumb', ({delegatedTarget: {src}}) => this._mainImage.src = src)
            .on('click', '.back', (e) => this.emit('back'))
            .on('click', '.add', (e) => this.emit('add-to-cart', this._phone.id))
    }

    show(phone){
        this._phone = phone;
        this._render();
        this._mainImage = this._element.querySelector('img.phone');
        [this._mainImage.src] = phone.images;
        super.show();
    }

    _render() {

        this._element.innerHTML = `
        
    <img class="phone">
    <button class="back">Back</button>
    <button class="add">Add to basket</button>
    <h1>${this._phone.name}</h1>
    <p>${this._phone.description}</p>
    <ul class="phone-thumbs">
    ${this._phone.images.map((imgSrc) => `<li><img class="phone-thumb" src=${imgSrc}></li>`).join('')}
    </ul>
    `
    }
}

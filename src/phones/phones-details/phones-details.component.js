import {BaseComponent} from "../../shared/components/base/base.component.js";

export class PhonesDetailsComponent extends BaseComponent {
    constructor({element, addToBasket, removeFromBasket}){
        super({element});
        this._addToBasket = addToBasket;
        this._removeFromBasket = removeFromBasket;
        this._element.addEventListener('click', (event) =>{
            let element = event.target.closest('.btn-back');
            if(!element){
                return;
            }
            document.location = document.referrer;
        });
        this._element.addEventListener('click', (event) => {
            let element = event.target.closest('.btn-add');
            if(!element){
                return;
            }
            this._addToBasket(this._phone.id);
        });
        this._element.addEventListener('click', (event) =>{
            let element = event.target.closest('.btn-remove');
            if(!element){
                return;
            }
            this._removeFromBasket(this._phone.id);
        })
    }

    button(count){
        if(count === 1) {
            let btnRemove = document.createElement('button');
            let element = this._element.querySelector('.btn-add');
            btnRemove.innerHTML = 'Remove from basket';
            btnRemove.classList.toggle('btn-remove');
            element.after(btnRemove);
        }
    }

    buttonRemove(count){
        if(count === 1) {
            let element = this._element.querySelector('.btn-remove');
            element.hidden = true;
        }
    }


    show(phone){
        this._phone = phone;
        this._render();
        super.show();
    }

    _render() {
        let images = [];
        let phone = this._phone;
        this._phone.images.forEach((img) => images.push(`<li><img src=${img}></li>`));
        this._element.innerHTML = `
        
    <img class="phone" src=${this._phone.images[0]}>

    <button class="btn-back">Back</button>
    <button class="btn-add">Add to basket</button>
    <h1>${phone.name}</h1>

    <p>${phone.description}</p>

    <ul class="phone-thumbs">
    
    ${images.join('')}
    
    </ul>
        
        `
    }
}

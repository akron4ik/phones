import {BaseComponent} from "../../shared/components/base/base.component.js";

export class PhonesDetailsComponent extends BaseComponent {
    constructor({element}, phone){
        super({element});
        this._phone = phone;
        this._element.addEventListener('click', (event) =>{
            let element = event.target.closest('.btn-back');
            if(!element){
                return;
            }
            document.location = document.referrer;
        })
    }


    show(phone){
        this._phone = phone;
        this._render();
        super.show();
    }

    _render() {
        let images = [];
        this._phone.images.forEach((img) => images.push(`<li><img src=${img}></li>`));

        this._element.innerHTML = `
        
    <img class="phone" src=${this._phone.images[0]}>

    <button class="btn-back">Back</button>
    <button>Add to basket</button>
    <h1>${this._phone.name}</h1>

    <p>${this._phone.description}</p>

    <ul class="phone-thumbs">
    
    ${images.join('')}
    
    </ul>
        
        `

    }
}

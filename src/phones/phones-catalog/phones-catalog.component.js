import {BaseComponent} from "../../shared/components/base/base.component.js";

export class PhonesCatalogComponent extends BaseComponent {
    constructor({element}) {
        super({element});
        this._phones = [];
        this
            .on('click', '.thumb', (e) => {
                const {phoneId} = e.delegatedTarget.dataset;
                this.emit('phone-selected', phoneId)
            })
            .on('click', 'a.add', (e) => {
                const {phoneId} = e.delegatedTarget.dataset;
                this.emit('add-to-cart', phoneId)
        })
    }


    show(phones) {
        this._phones = phones;
        this._render();
        super.show();
    }

    _render() {
        this._element.innerHTML = `
           <ul class="phones">
           ${this._phones.map((phone) => {
            return ` <li class="thumbnail">
                           <a href="#!/phones/${phone.id}" class="thumb" data-phone-id=${phone.id}>
                               <img alt=${phone.name} src=${phone.imageUrl}>
                           </a>

                           <div class="phones__btn-buy-wrapper">
                                    <a class="btn btn-success add" data-phone-id=${phone.id}>
                                                    Add
                                    </a>
                           </div>

                           <a href="#!/phones/${phone.id}">${phone.name}</a>
                           <p>${phone.snippet}</p>
                     </li>
           `
        }).join('')}
        </ul>
        
        `
    }
}

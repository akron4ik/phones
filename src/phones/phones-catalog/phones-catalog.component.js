import {BaseComponent} from "../../shared/components/base/base.component.js";

export class PhonesCatalogComponent extends BaseComponent {
    constructor({element, phones}) {
        super({element});
        this._phones = phones;
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

    _filterByName(arr, val){
        if(val === 'age') {
            arr.sort(((a, b) => a.age < b.age ? -1 : 1));
            return
        }
        arr.sort(((a, b) => a.name < b.name ? -1 : 1));
    }

    show(phones) {
        this._render(phones);
        super.show();
    }

    _render(phones) {
        this._element.innerHTML = `
           <ul class="phones">
           ${phones.map((phone) => {
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

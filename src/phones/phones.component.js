import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {PhonesService} from "./phones.service.js";
import {PhonesDetailsComponent} from "./phones-details/phones-details.component.js";
import {BaseComponent} from "../shared/components/base/base.component.js";
import {BasketService} from "../basket/basket.service.js";
import {BasketComponent} from "../basket/basket.component.js";


export class PhonesComponent extends BaseComponent {
    constructor({element}) {
        super({element});
        this._render();
        this._catalog = new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog'),
            phones: PhonesService.getAll(),
            onPhoneSelected: (phoneId) => {
                const phone = PhonesService.getOneById(phoneId);
                this._catalog.hide();
                this._details.show(phone);
            }
        });
        this._details = new PhonesDetailsComponent({
            element: this._element.querySelector('.phones-details'),
            addToBasket: (phoneId) => {

                BasketService.add(phoneId);
                BasketService.show();//tests
                let count = BasketService.size(phoneId);
                this._details.button(count);
            },
            removeFromBasket: (phoneId) => {
                let count = BasketService.size(phoneId);
                this._details.buttonRemove(count);
                BasketService.remove(phoneId);
                BasketService.show();//tests
            }
        });

        this._basket = new BasketComponent({
           element: this._element.querySelector('.basket-of-phones'),

        });

        this._element.addEventListener('click', (event) => {
            let element = event.target.closest('.basket-image');
            if (!element) {
                return;
            }
            let phoneId = BasketService.getAll();
            console.log(phoneId);
            let phone = PhonesService.getOneById(phoneId);
            let count = BasketService.size(phoneId);

            this._catalog.hide();
            this._details.hide();
            this._basket.show(phone, count);
        })

    }

    _render() {
        this._element.innerHTML = `
            <div class="row">

      <!--Sidebar-->
      <div class="col-md-2">
        <section>
          <p>
            Search:
            <input>
          </p>

          <p>
            Sort by:
            <select>
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </p>
        </section>

        <section>
          <p>Shopping Cart</p>
          <ul>
            <li>Phone 1</li>
            <li>Phone 2</li>
            <li>Phone 3</li>
          </ul>
        </section>
        <img class="basket-image" src="img/basket.png">
      </div>

      <!--Main content-->
      <div class="col-md-10">
        <div class="phones-catalog"></div>
        <div class="phones-details"></div>
        <div class="basket-of-phones"></div>
      </div>
    </div>
        
        `
    }
}

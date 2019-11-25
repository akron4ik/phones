import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {PhonesService} from "./phones.service.js";
import {PhonesDetailsComponent} from "./phones-details/phones-details.component.js";
import {BaseComponent} from "../shared/components/base/base.component.js";
import {CartComponent} from "./cart/cart.component.js";

export class PhonesComponent extends BaseComponent {
    constructor({element}) {
        super({element});
        this._render();
        this._initCatalog();
        this._initDetails();
        this._initCart();

    }

    _initCatalog(){
        this._catalog = new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog'),
            phones: PhonesService.getAll()
        });
        this._catalog
            .subscribe('phone-selected', ({detail: phoneId}) => {
            const phone = PhonesService.getOneById(phoneId);
            this._catalog.hide();
            this._details.show(phone);
        })
            .subscribe('add-to-cart', ({detail: phoneId}) => this._cart.add(phoneId))
    }

    _initDetails(){
        this._details = new PhonesDetailsComponent({
            element: this._element.querySelector('.phones-details'),
        });
        this._details
            .subscribe('back', ({detail: phoneId}) => {
              this._catalog.show();
              this._details.hide();
            })
            .subscribe('add-to-cart', ({detail: phoneId}) => this._cart.add(phoneId))
    }

    _initCart(){
        this._cart = new CartComponent({
            element: this._element.querySelector('.cart'),
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

        <section class="cart"></section>
      </div>

      <!--Main content-->
      <div class="col-md-10">
        <div class="phones-catalog"></div>
        <div class="phones-details"></div>
      </div>
    </div>
        
        `
    }
}

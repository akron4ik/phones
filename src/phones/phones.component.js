import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {PhonesService} from "./phones.service.js";
import {PhonesDetailsComponent} from "./phones-details/phones-details.component.js";
import {BaseComponent} from "../shared/components/base/base.component.js";


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

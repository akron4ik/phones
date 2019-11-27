import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {PhonesService} from "./phones.service.js";
import {PhonesDetailsComponent} from "./phones-details/phones-details.component.js";
import {BaseComponent} from "../shared/components/base/base.component.js";
import {CartComponent} from "./cart/cart.component.js";
import {FilterComponent} from "./filter/filter.component.js";

export class PhonesComponent extends BaseComponent {
    constructor({element}) {
        super({element});
        this._render();
        this._initCatalog();
        this._initDetails();
        this._initCart();
        this._initFilter();
    }

    _initFilter(){
        this._filter = new FilterComponent({
            element: this._element.querySelector('.phones-filter'),
        });
        this._filter.subscribe('search-phone', ({detail: searchText}) => {
            this.searchText = searchText;
            this._showFilteredPhones();
        });
        this._filter.subscribe('filter-phones', ({detail: orderBy}) => {
            this.orderBy = orderBy;
            this._showFilteredPhones();
        })
    }

    _initCatalog(){
        this._catalog = new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog'),
        });
        this._showFilteredPhones();
        this._catalog
            .subscribe('phone-selected', ({detail: phoneId}) => {
              const phone = PhonesService.getOneById(phoneId);
              this._catalog.hide();
              this._details.show(phone);})
            .subscribe('add-to-cart', ({detail: phoneId}) => this._cart.add(phoneId));
    }

    _initDetails(){
        this._details = new PhonesDetailsComponent({
            element: this._element.querySelector('.phones-details'),
        });
        this._details
            .subscribe('back', ({detail: phoneId}) => {
              this._showFilteredPhones();
              this._details.hide();})
            .subscribe('add-to-cart', ({detail: phoneId}) => this._cart.add(phoneId))
    }

    _initCart(){
        this._cart = new CartComponent({
            element: this._element.querySelector('.cart'),
        })
    }

    async _showFilteredPhones(){
        const phones = await PhonesService.getAll({searchText: this.searchText, orderBy: this.orderBy});
        this._catalog.show(phones);
    }

    _render() {
        this._element.innerHTML = `
            <div class="row">
      <!--Sidebar-->
      <div class="col-md-2">
        <section class="phones-filter"></section>

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

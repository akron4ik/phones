import {BaseComponent} from "../../shared/components/base/base.component.js";

export class FilterComponent extends BaseComponent{
    constructor({element}) {
        super({element});
        this._render();
        this._filter();
        this
            .on('keydown', '.search', (e) => {
            if (e.keyCode !== 13) {
                return;
            }
            console.log(e.delegatedTarget.value);
            this.emit('search-phone', e.delegatedTarget.value)
        });
    }

    _filter(){
        this.on('click', '.filter', (e) => {
            this._filterName = e.delegatedTarget.value;
            this.emit('filter-phones', this._filterName);
        })
        return this._filterName;
    }




    _render(){
        this._element.innerHTML = `
          <p>
            Search:
            <input class="search">
          </p>

          <p>
            Sort by:
           
            <select class="filter">
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
             </select>
          </p>
        
        `
    }


}
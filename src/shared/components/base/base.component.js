export class BaseComponent {
    constructor({element}) {
        this._element = element;
    }

    show() {
        this._element.hidden = false;
    }

    hide() {
        this._element.hidden = true;
    }

    on(eventName, selector, cb) {
        this._element.addEventListener(eventName, (e) => {
            const el = e.target.closest(selector);
            if(!el) {
                return;
            }
            e.delegatedTarget = el;
            cb(e);
        });
        return this;
    }

    subscribe(eventName, cb){
        this._element.addEventListener(eventName, cb)
        return this;

    }

    emit(eventName, details){
        const customEvent = new CustomEvent(eventName, {detail: details});
        this._element.dispatchEvent(customEvent);
    }
}

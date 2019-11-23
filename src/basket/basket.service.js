
let addedPhones = new Map();
export const BasketService = new class {
    constructor() {
        console.log('init BasketService');
    }
    add(phoneId){
        if(!addedPhones.has(phoneId)){
            addedPhones.set(phoneId, 1);
            return;
        }
        let count = addedPhones.get(phoneId) + 1;
        addedPhones.delete(phoneId);
        addedPhones.set(phoneId, count)
    }
    remove(phoneId){
        let count = addedPhones.get(phoneId);
        if(!addedPhones.has(phoneId)){
            return;
        }
        if(count > 1){
            count--;
            addedPhones.set(phoneId, count);
        }
        else if (count === 1) {
            addedPhones.delete(phoneId);
        }
    }
    show(){
        console.log(addedPhones);
    }
    size(phoneId){
       return addedPhones.get(phoneId);
    }
    getAll(){
        let phoneId;
            for(let el of addedPhones.keys()){
                phoneId = el;
            }
        return phoneId;
    }
};

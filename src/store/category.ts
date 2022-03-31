import { makeAutoObservable } from 'mobx';

let sample:string[] = ['낙서장','일상','개발','독서','여행'];

class Category {
    // observable
    categories:string[] = sample;

    constructor() {
        makeAutoObservable(this);
    }

    // computed
    get getCategories() {  
        return this.categories;
    }

    // action
    addCategory = (item:string) => {
        this.categories.push(item);
    }

    deleteCategory = (item:string) => {
        this.categories = this.categories.filter( target => target !== item );
    }   
}

const categoryStore = new Category();
export default categoryStore;
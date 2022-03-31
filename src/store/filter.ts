import { makeAutoObservable } from 'mobx';
import postStore from './post';

class Filter {
    filteredList:any = [];
    searchKeyword:string='';
    seletedCategory:string='전체';

    constructor() {
        makeAutoObservable(this);
    }

    get getFilteredList() {
        return this.filteredList;
    }

    setByCategory = (category:string) => {
        this.filteredList = postStore.posts.filter(item=>item.category===category);
    }

    setBySearch = (keyword:string) => {
        this.searchKeyword = keyword;
    }
}

const filterStore = new Filter();
export default filterStore;
import { makeAutoObservable } from "mobx";
import filterStore from './filter';
import postStore from './post';
import {Item} from '../types';

type ViewState = 'Home' | 'Create' | 'Update' | 'Search' | 'Detail';

class State {
    nowState:ViewState = 'Home';

    constructor() {
        makeAutoObservable(this);
    }

    moveToHome = () => {
        filterStore.searchKeyword = '';
        this.nowState = 'Home';
    }

    moveToCreate = () => {
        this.nowState = 'Create';
    }
    
    moveToUpdate = (post:Item) => {
        postStore.editingPost = post;
        this.nowState = 'Update';
    }
    
    moveToSearch = (keyword:string) => {
        postStore.keyword = keyword;
        filterStore.filteredList = postStore.posts.filter(item=>(item.title.includes(keyword)) || (item.content.includes(keyword)));
        this.nowState = 'Search';
    }

    moveToCategory = (category:string) => {
        filterStore.filteredList = postStore.posts.filter(item=>(item.category===category));
    }

}
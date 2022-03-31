import { makeAutoObservable } from 'mobx';

export interface Item {
    id: number;
    title: string;
    content: string;
    category: string;
    date: string;
}

type ViewState = 'Home' | 'Create' | 'Update' | 'Search' | 'Detail' | 'Category';

export const getNowDate = (): string => {
    const date = new Date();
    return (
        String(date.getFullYear()) + '. ' + String(date.getMonth()+1) + '. ' + String(date.getDate()) + '. ' + 
        String(date.getHours()) + ':' + String(date.getMinutes())
    );
}

export class NewId {
    private static id:number=5;

    static getId(): number {
        this.id += 1;
        return(this.id);
    }
}

const sample:Item[] = [
    {
        id: 1,
        title: 'js',
        content: 'react',
        category: '일상',
        date: getNowDate(),
      },
      {
        id: 2,
        title: 'java',
        content: 'spring',
        category: '개발',
        date: getNowDate(),
      },
      {
        id: 3,
        title: 'c#',
        content: '.net core',
        category: '개발',
        date: getNowDate(),
      },
      {
        id: 4,
        title: 'python',
        content: 'django',
        category: '낙서',
        date: getNowDate(),
      },
      {
        id: 5,
        title: 'node',
        content: 'express',
        category: '여행',
        date: getNowDate(),
      }
]
class Post {
    keyword: string = '';
    posts: Item[] = sample;
    filteredPosts:Item[] = [];
    selectedPost: Item = {
        id: 0,
        title: '',
        content: '',
        category: '',
        date: '',
    };
    editingPost: Item = {
        id: 0,
        title: '',
        content: '',
        category: '',
        date: '',
    }
    currentView: ViewState = 'Home';
    isDetail:boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    create = (post:Item) => {
        this.posts = [post, ...this.posts];
        this.moveToHome();
    };

    read = (post: Item) => {
        if (this.currentView === 'Detail') {
            (post.id === this.selectedPost.id) ? (this.currentView = 'Home') : (this.selectedPost = post);
        } else {
            this.selectedPost = post;
            this.currentView = 'Detail';
        }
    }

    update = (post:Item) => {
        this.posts = this.posts.map(origin => (origin.id === post.id) ? post : origin);
        this.moveToHome();
    };

    delete = (id: number) => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.moveToHome();    }




    moveToHome = () => {
        this.keyword = '';
        this.currentView = 'Home';
    }

    moveToCreate = () => {
        this.currentView = 'Create';
    }
    
    moveToUpdate = (post:Item) => {
        this.editingPost = post;
        this.currentView = 'Update';
    }
    
    moveToSearch = (keyword:string) => {
        this.keyword = keyword;
        this.filteredPosts = this.posts.filter(item=>(item.title.includes(keyword)) || (item.content.includes(keyword)));
        this.currentView = 'Search';
    }
}

const postStore = new Post();
export default postStore;
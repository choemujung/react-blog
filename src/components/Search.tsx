import { useRef, useEffect, useState } from 'react';
import postStore, { Item } from '../store/post';
import PostList from './PostList';
import ViewPost from './Detail';
import { observer } from 'mobx-react';

const Search = observer(() => {

    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchRef.current !== null) {
            searchRef.current.value = postStore.keyword;
        }

        console.log(postStore.keyword + ' ' + postStore.filteredPosts);
    }, []);

    return (
        <div>
            <div>
                <input ref={searchRef} type="text" />
                <button>검색</button>
            </div>
            <PostList posts={postStore.filteredPosts} />
        </div>
    )

});

export default Search;
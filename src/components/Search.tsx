import { useRef, useEffect, useState } from 'react';
import { Item } from '../types';
import PostList from './PostList';
import ViewPost from './ViewPost';

interface SearchProps {
    keyword: string;
    posts: Item[];
    onRemove: (id: number) => void;
    onClickWrite: (item: Item) => void;
    onClickDetail: (item: Item) => void;
}

function Search({ keyword, posts, onRemove, onClickDetail, onClickWrite }: SearchProps) {
    const searchRef = useRef<HTMLInputElement>(null);
    const filteredPosts: Item[] = posts.filter(post =>
        (post.title.includes(keyword) || post.content.includes(keyword))
    );

    useEffect(() => {
        if (searchRef.current !== null) {
            searchRef.current.value = keyword;
        }
    }, []);

    return (
        <div>
            <div>
                <input ref={searchRef} type="text" />
                <button>검색</button>
            </div>
            <PostList posts={filteredPosts} onRemove={onRemove} onClickWrite={onClickWrite}
                onClickDetail={onClickDetail} />
        </div>
    )
}

export default Search;
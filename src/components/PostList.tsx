import { useState } from "react";
import postStore, { Item } from "../store/post";
import { observer } from 'mobx-react';

// components

interface ItemProps {
    post: Item;
}

interface ListProps {
    posts: Item[];
}

const PostItem = observer(({post}:ItemProps)=>{
    const [isHide, setHide] = useState<boolean>(true);
    console.log(post);
    return (
        <div onMouseEnter={() => setHide(false)} onMouseLeave={() => setHide(true)}>
            <span onClick={() => postStore.read(post)}>{post.title}</span>
            <span>{post.date}</span>
            {!isHide && (
                <span >
                    <button onClick={() => postStore.moveToUpdate(post)}>수정</button>
                    <button onClick={() => postStore.delete(post.id)}>삭제</button>
                </span>
            )}
        </div>
    );
});

const PostList = observer(({posts}:ListProps) => {
    return (
        <div>
            {
                posts.map((post: Item) =>
                    <PostItem post={post} key={post.id} />
                )
            }
        </div>
    )
});

export default PostList;
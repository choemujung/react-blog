import { useState } from "react";
import { Item } from "../types";
import ViewPost from "./ViewPost";

// props type
interface ItemProps {
    post: Item;
    nextId: number;
    onRemove: (id: number) => void;
    changeToEdit: (view:string, post:Item) => void;
    changeToViewPost: (view: string, post:Item) => void;
}
    
interface ListProps {
    posts: Item[];
    nextId: number;
    onRemove: (id: number) => void;
    changeToEdit: (view:string, post:Item) => void;
    changeToViewPost: (view: string, post:Item) => void;
}

// components
function PostItem({ post, nextId, onRemove, changeToEdit, changeToViewPost }: ItemProps) {
    const [isHide, setHide] = useState<boolean>(true);

    return (
        <div className="container" onMouseEnter={() => setHide(false)} onMouseLeave={() => setHide(true)}>
            <span onClick={()=>changeToViewPost('ViewPost', post)}>{post.title}</span>
            {!isHide && (
                <span >
                    <button onClick={()=>changeToEdit('Edit', post)}>수정</button><button>삭제</button>
                </span>
            )}
        </div>
    );
}
function PostList({ posts, nextId, onRemove, changeToEdit, changeToViewPost }: ListProps) {
    return (
        <div>
            {posts.map(post => (
                <PostItem post={post} nextId={nextId} key={post.id} onRemove={onRemove} 
                changeToEdit={changeToEdit} changeToViewPost={changeToViewPost} />
            ))}
        </div>

    )
}

export default PostList;
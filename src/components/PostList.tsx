import { Item } from "../types";

// props type
interface ItemProps {
    post:Item;
    nextId:number;
    onRemove: (id:number) => void;
    onUpdate: (newPost:Item) => void; 
}
interface ListProps {
    posts:Item[];
    nextId:number;
    onRemove: (id:number) => void;
    onUpdate: (newPost:Item) => void;
}

// components
function PostItem({post, nextId, onRemove, onUpdate}: ItemProps) {
    return (
        <div className="container">
            <div>{post.title}</div>
        </div>
    );
}
function PostList({posts, nextId, onRemove, onUpdate}: ListProps) {
    return (
        <div className="container">
            {posts.map(post => (
                <PostItem post={post} nextId={nextId} key={post.id} onRemove={onRemove} onUpdate={onUpdate}/>
            ))}
        </div>
    )
}

export default PostList;
import { Item } from "../types";
import PostItem from './PostItem';

// props type
interface ListProps {
    posts: Item[];
    onRemove: (id: number) => void;
    onClickWrite: (item:Item) => void;
    onClickDetail: (item:Item) => void;
}

// components
function PostList({posts, onRemove, onClickWrite, onClickDetail}: ListProps) {
    return (
        <div>
            {
                posts.map((post: Item) =>
                    <PostItem post={post} onRemove={onRemove}
                        onClickWrite={onClickWrite} onClickDetail={onClickDetail} key={post.id} />
                )
            }
        </div>

    )
}


export default PostList;
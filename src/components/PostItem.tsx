import {Item} from '../types';
import {useState} from 'react';

interface ItemProps {
    post: Item;
    onRemove: (id: number) => void;
    onClickWrite: (item: Item) => void;
    onClickDetail: (item: Item) => void;
}

function PostItem({ post, onRemove, onClickWrite, onClickDetail }: ItemProps) {
    const [isHide, setHide] = useState<boolean>(true);

    return (
        <div className="container" onMouseEnter={() => setHide(false)} onMouseLeave={() => setHide(true)}>
            <span onClick={() => onClickDetail(post)}>{post.title}{}</span><span>{post.date}</span>
            {!isHide && (
                <span >
                    <button onClick={() => onClickWrite(post)}>수정</button>
                    <button onClick={() => onRemove(post.id)}>삭제</button>
                </span>
            )}
        </div>
    );
}

export default PostItem;
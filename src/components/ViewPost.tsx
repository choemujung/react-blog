import {Item} from '../types'

interface ViewPostProps {
    post: Item;
    onRemove: (id:number) => void;
    onClickWrite: (item: Item) => void;
    onCancel: () => void;
}

function ViewPost({post, onRemove, onClickWrite, onCancel}: ViewPostProps) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.date}</p>
            <p>{post.content}</p>
            <button onClick={onCancel}>목록</button>
            <button onClick={()=>onClickWrite(post)}>수정</button>
            <button onClick={()=>onRemove(post.id)}>삭제</button>
        </div>
    )
}

export default ViewPost;
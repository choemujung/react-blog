import {Item} from '../types'

interface ViewPostProps {
    post: Item;
    setView: (view:string) => void;
}

function ViewPost({post, setView}: ViewPostProps) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.date}</p>
            <p>{post.content}</p>
            <button onClick={()=>setView('Home')}>목록</button>
            {/* <button onClick={}>수정</button> */}
        </div>
    )
}

export default ViewPost;
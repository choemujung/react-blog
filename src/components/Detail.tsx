import { observer } from 'mobx-react';
import postStore from '../store/post'



const Detail = observer(() => {
    const selectedPost = postStore.selectedPost;
    return (
        <div>
            <h1>{selectedPost.title}</h1>
            <p>{selectedPost.date}</p>
            <p>{selectedPost.category}</p>
            <p>{selectedPost.content}</p>
            <button onClick={()=>postStore.moveToHome()}>목록</button>
            <button onClick={()=>postStore.moveToUpdate(selectedPost)}>수정</button>
            <button onClick={()=>postStore.delete(selectedPost.id)}>삭제</button>
        </div>
    )
    });

export default Detail;
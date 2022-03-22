import PostList from './components/PostList';
import Write from './components/Write';
import { MutableRefObject, useRef, useState } from 'react';
import { Item } from './types';

function App() {
  // 내부 함수 컴포넌트
  function Home() {
    return (
      <div className='container'>
        <div className='header'>
          <span>Blog</span>
          <button className='writeBtn' onClick={handleClickWriteBtn}>글쓰기</button>
        </div>
        <div className='contents'>
          <PostList posts={posts} nextId={nextId.current} onRemove={onRemove} onUpdate={onUpdate} />
        </div>
      </div>
    );
  }

  
  const nextId: MutableRefObject<number> = useRef<number>(1);
  const [posts, setPosts] = useState<Item[]>([]);
  const [isWriting, setIsWriting] = useState<boolean>(false);


  // 함수
  const onCreate = (post: Item): void => {
    setPosts([...posts, post]);
    nextId.current++;
    setIsWriting(false);
  }
  const onRemove = (id: number): void => {
    setPosts(posts.filter(post => post.id !== id));
  }
  const onUpdate = (newPost: Item): void => {
    const newPosts = posts.map((currentPost: Item) => (currentPost.id === newPost.id) ? newPost : currentPost);
    setPosts(newPosts);
  }
  const handleClickWriteBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsWriting(true);
  }

  return (
    <div>
      {
        isWriting ? <Write onCreate={onCreate} nextId={nextId.current}/> : <Home />
      }
    </div>
  );
}

export default App;
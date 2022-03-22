import PostList from './components/PostList';
import { MutableRefObject, useRef, useState } from 'react';
import { Item } from './types';

function App() {
  const nextId:MutableRefObject<number> = useRef<number>(1);
  const [posts, setPosts] = useState<Item[]>([
    {
      id: 1,
      title: '테스트 제목1',
      content: '오늘은 리액트 삽질했다.',
      category: '일상',    
      date: '22-03-22-화'
    },
    {
      id: 2,
      title: '테스트 제목2',
      content: '오늘은 리액트 삽질했다.',
      category: '일상',    
      date: '22-03-22-화'
    }
  ]);
  const [isWriting, setIsWriting] = useState<boolean>(false);

  
  //post 추가
  const onCreate = (post:Item):void => {
    setPosts([...posts, post]);
  }
  const onRemove = (id:number):void => {
    setPosts(posts.filter(post=>post.id !== id));
  }
  const onUpdate = (newPost:Item):void => {
    const newPosts = posts.map((currentPost:Item) => (currentPost.id === newPost.id) ? newPost : currentPost);
    setPosts(newPosts);
  }
  const handleWriteClick = (e:React.MouseEvent<HTMLButtonElement>) => {

  }

  return (
    <div className='container'>
      <div className='header'>
        <span>Blog</span>
        <button className='write' onClick={handleWriteClick}>글쓰기</button>
      </div>
      <div className='contents'>
        <PostList posts={posts} nextId={nextId.current} onRemove={onRemove} onUpdate={onUpdate}/>
      </div>

    </div>

  );
}

export default App;
import PostList from './components/PostList';
import Write from './components/Write';
import { MutableRefObject, useRef, useState } from 'react';
import { Item } from './types';
import ViewPost from './components/ViewPost'
import Edit from './components/Edit';

function App() {
  const nextId: MutableRefObject<number> = useRef<number>(1);
  const [posts, setPosts] = useState<Item[]>([]);
  // const [view, setView] = useState({
  //   isHome: true,
  //   isWriting: false,
  //   isEditing: false,
  // });
  const [view, setView] = useState<string>('Home');
  const [post, setPost] = useState<Item>({
    id: 0,
    title: '',
    content: '',
    category: '',    
    date: '',
  });
  // 함수
  const onCreate = (post: Item): void => {
    setPosts([...posts, post]);
    nextId.current++;
    setView('Home');
    // setView({
    //   isHome: true,
    //   isWriting: false,
    //   isEditing: false,
    // });
  }
  const onCancel = (): void => {
    // setView({
    //   isHome: true,
    //   isWriting: false,
    //   isEditing: false,
    // });
    setView('Home');
  }
  const onRemove = (id: number): void => {
    setPosts(posts.filter(post => post.id !== id));
  }
  const onUpdate = (newPost: Item): void => {
    const newPosts = posts.map((currentPost: Item) => (currentPost.id === newPost.id) ? newPost : currentPost);
    setPosts(newPosts);
    setView('Home');
  }
  const handleClickWriteBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setView({
    //   isHome: false,
    //   isWriting: true,
    //   isEditing: false
    // });
    setView('Write');
  }
  const changeToViewPost = (view:string, post:Item) => {
    setView(view);
    setPost(post);
  };
  const changeToEdit = (view:string, post:Item) => {
    setView(view);
    setPost(post);
  };

  function Home() {
    return (
      <div className='container'>
        <div className='header'>
          <span>Blog</span>
          <button className='writeBtn' onClick={handleClickWriteBtn}>글쓰기</button>
        </div>
        <div className='contents'>
          <PostList posts={posts} nextId={nextId.current} 
          onRemove={onRemove} changeToEdit={changeToEdit} changeToViewPost={changeToViewPost} 
          />
        </div>
      </div>
    );
  }

  switch (view) {
    case 'Home':
      return <Home />;
    case 'Write':
      return <Write nextId={nextId.current} onCreate={onCreate} onCancel={onCancel} />;
    case 'ViewPost':
      return <ViewPost post={post} setView={setView}/>
    case 'Edit':
      return <Edit post={post} onUpdate={onUpdate} onCancel={onCancel}/>
    default:
      return null;
  }
}

export default App;
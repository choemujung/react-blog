import PostList from './components/PostList';
import Write from './components/Write';
import { useState } from 'react';
import { Item } from './types';
import ViewPost from './components/ViewPost'


function App() {
  const [posts, setPosts] = useState<Item[]>([]);

  const [view, setView] = useState<string>('Home');
  const [post, setPost] = useState<Item>({
    id: 0,
    title: '',
    content: '',
    category: '',
    date: '',
  });

  // 함수
  // 생성
  console.log(posts);

  const onCreate = (post: Item): void => {
    console.log('onCreat')
    setPosts([post, ...posts]);
    setView('Home');
  }
  // 취소
  const onCancel = (): void => {
    setView('Home');
  }
  // 삭제
  const onRemove = (id: number): void => {
    setPosts(posts.filter(post => post.id !== id));
    if (view !== 'Home') {
      setView('Home');
    }
  }
  // 수정
  const onUpdate = (newPost: Item): void => {
    setPosts(posts.map((currentPost: Item) => (currentPost.id === newPost.id) ? newPost : currentPost));
    setView('Home');
  }
  // 상세 뷰 보기
  const onClickDetail = (post: Item) => {
    setPost(post);
    setView('ViewPost');

  }
  // 글쓰기 페이지 보기
  const onClickWrite = (post?: Item) => {
    if (post == undefined) {  //글쓰기
      setView('Create');
    } else {  //수정
      setPost(post);
      setView('Edit');
    }
  }

  function Home() {
    return (
      <div className='container'>
        <div className='header'>
          <span>Blog</span>
          <button className='writeBtn' onClick={() => onClickWrite()}>글쓰기</button>
        </div>
        <div className='contents'>
          <PostList posts={posts} onRemove={onRemove} onClickWrite={onClickWrite} onClickDetail={onClickDetail} />
        </div>
      </div>
    );
  }

  switch (view) {
    case 'Home':
      return <Home />
    case 'Create':
      return <Write onCreate={onCreate} onUpdate={onUpdate} onCancel={onCancel} />
    case 'Edit':
      return <Write post={post} onCreate={onCreate} onUpdate={onUpdate} onCancel={onCancel} />
    case 'ViewPost':
      return <ViewPost post={post} onRemove={onRemove} onClickWrite={onClickWrite} onCancel={onCancel} />

  }
  return (
    <Home />
  );
  // switch (view) {
  //   case 'Home':
  //     return <Home />;
  //   case 'Write':
  //     return <Write nextId={nextId.current} onCreate={onCreate} onCancel={onCancel} />;
  //   case 'ViewPost':
  //     // return <ViewPost post={post} setView={setView} onItemClick={onItemClick}/>
  //   case 'Edit':
  //     return <Edit post={post} onUpdate={onUpdate} onCancel={onCancel}/>
  //   default:
  //     return null;
  // }
}

export default App;
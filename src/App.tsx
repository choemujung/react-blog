import PostList from './components/PostList';
import Write from './components/Write';
import { useState } from 'react';
import { Item } from './types';
import ViewPost from './components/ViewPost'


function App() {
  const [view, setView] = useState<string>('Home');
  const [categories, setCategories] = useState<string[]>([]);
  const [posts, setPosts] = useState<Item[]>([]);
  const [post, setPost] = useState<Item>({
    id: 0,
    title: '',
    content: '',
    category: '',
    date: '',
  });

  // 함수

  // 생성
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
          <div className='title'>
            <span>Blog</span>
          </div>
          <div className='write'>
            <button className='writeBtn' onClick={() => onClickWrite()}>글쓰기</button>
          </div>
        </div>
        <div className='contents'>
          <PostList posts={posts} onRemove={onRemove} onClickWrite={onClickWrite} onClickDetail={onClickDetail} />
        </div>
      </div>
    );
  }

  switch (view) {
    case 'Home':
      {console.log(posts);}
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

}

export default App;
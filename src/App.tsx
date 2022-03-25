import PostList from './components/PostList';
import Write from './components/Write';
import { useRef, useState } from 'react';
import { Item, getNow } from './types';
import ViewPost from './components/ViewPost'
import Search from './components/Search';
// import './css/Write.css'

type ViewState = 'Home'|'Create'|'Edit'|'Search';
// enum

function App() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [viewDetail, setViewDetail] = useState<boolean>(false);
  const [view, setView] = useState<ViewState>('Home');
  // const [categories, setCategories] = useState<string[]>([]);
  const [posts, setPosts] = useState<Item[]>([{
    id: 1,
    title: 'js',
    content: 'react',
    category: '',
    date: getNow(),
  },{
    id: 2,
    title: 'java',
    content: 'spring',
    category: '',
    date: getNow(),
  },{
    id: 3,
    title: 'c#',
    content: '.net core',
    category: '',
    date: getNow(),
  },{
    id: 4,
    title: 'python',
    content: 'django',
    category: '',
    date: getNow(),
  },{
    id: 5,
    title: 'node',
    content: 'express',
    category: '',
    date: getNow(),
  }]);
  const [currentPost, setPost] = useState<Item>({
    id: 0,
    title: '',
    content: '',
    category: '',
    date: '',
  });

  // 함수

  // 검색
  const onSearch = () => {
    if (searchRef.current !== null) {
      if (searchRef.current.value === '') {
        alert('검색어를 입력하세요.');
      } else {
        setKeyword(searchRef.current.value);
        setView("Search");
      }
    }
  }
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
    if (viewDetail) {
      (post.id === currentPost.id) ? setViewDetail(false) : setPost(post);
    } else {
      setPost(post);
      setViewDetail(true);
    }
    // setPost(post);
    // setViewDetail(true);
  }
  // 글쓰기 페이지 보기
  const [updatePost, setUpdatePost] = useState<Item>({
    id: 0,
    title: '',
    content: '',
    category: '',
    date: '',
  });
  const onClickWrite = (post?: Item) => {
    if (post === undefined) {  //글쓰기
      setView('Create');
    } else {  //수정
      setUpdatePost(post);
      setView('Edit');
    }
  }

  function Home() {
    console.log(posts);
    return (
      <div>
        <div>
          <input type="text" ref={searchRef} />
          <button onClick={onSearch}>검색</button>
          <span><h1>블로그</h1></span>
          <button onClick={()=>onClickWrite()}>글쓰기</button>
          <PostList posts={posts} onRemove={onRemove} onClickDetail={onClickDetail} 
          onClickWrite={onClickWrite}/>
        </div>
        {
          viewDetail && <ViewPost post={currentPost} onRemove={onRemove} onClickWrite={onClickWrite} onCancel={onCancel} />
        }
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
      return <Write post={currentPost} onCreate={onCreate} onUpdate={onUpdate} onCancel={onCancel} />
    case 'Search':
      return (
        <div>
          <Search keyword={keyword} posts={posts} onRemove={onRemove}
            onClickDetail={onClickDetail} onClickWrite={onClickWrite} />
          {viewDetail && <ViewPost post={currentPost} onRemove={onRemove} onClickWrite={onClickWrite} onCancel={onCancel} />}
        </div>
      )
  }
}

export default App;
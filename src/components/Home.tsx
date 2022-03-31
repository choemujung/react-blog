import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';
import postStore, { Item } from "../store/post";
import PostList from './PostList';
import Category from './Category';

interface Props {
    posts: Item[];
    keyword?:string;
}

const Home = observer(({ posts, keyword }: Props)=> {
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(searchRef.current !== null) {
            if (keyword) {
                searchRef.current.value = keyword;
            } else {
                searchRef.current.value = '';
            }   
        }
    },[])

    const onClickSearch = () => {
        if (searchRef.current !== null) {
            const searchWord = searchRef.current.value;
            if(searchWord === '') {
                alert('검색어를 입력하세요.');
            } else {
                postStore.moveToSearch(searchWord);
            }
        }
    }
    return (
        <div>
            <div>
                <span onClick={()=>postStore.moveToHome()}><b>블로그</b></span>
                <input type="text" ref={searchRef} />
                <button onClick={onClickSearch}>검색</button>
                <button onClick={() => postStore.moveToCreate()}>글쓰기</button>
            </div>
            <Category/>
            {
                posts.length === 0 && <div>검색결과가 없습니다.</div>
            }
            <PostList posts={posts} />
        </div>
    )
});

export default Home;
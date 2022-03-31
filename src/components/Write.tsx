import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import postStore,{ Item, NewId, getNowDate } from "../store/post";
import Category from './Category';

interface WriteProps {
    post?: Item;
}

const Write = observer(({post}: WriteProps)=>{
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const categoryRef = useRef<string>('');

    const setSelected = (category:string) => {
        categoryRef.current = category;
        console.log(categoryRef.current);
    }

    useEffect(() => {
        if (titleRef.current !== null && contentRef.current !== null) {
            titleRef.current.value = '';
            contentRef.current.value = '';
            if (post !== undefined) {
                titleRef.current.value = post.title;
                contentRef.current.value = post.content;
            }
        }
    });

    const handleClickPublishBtn = () => {
        if ((titleRef.current !== null) && (contentRef.current !== null)) {
            const [title, content] = [titleRef.current.value, contentRef.current.value];
            if (title !== '') {
                if (content !== '') {
                    if (post === undefined) {
                        const newPost: Item = {
                            id: NewId.getId(),
                            title: title,
                            content: content,
                            category: categoryRef.current,
                            date: getNowDate()
                        }
                        postStore.create(newPost);
                    } else {
                          const newPost: Item = {
                            id: post.id,
                            title: title,
                            content: content,
                            category: categoryRef.current,
                            date: getNowDate()
                        }
                        postStore.update(newPost);
                    }
                } else {
                    alert('본문을 입력해주세요.');
                }
            } else {
                alert('제목을 입력해주세요.');
            }
        }
    }
    return (
        <div>
            <div>
                <div>
                    <input ref={titleRef} placeholder="제목" type="text" />
                </div>
                <Category setSelected={setSelected} post={post}/>
                <div>
                    <textarea ref={contentRef} placeholder="내용" />
                </div>
                <div>
                    <button onClick={() => postStore.moveToHome()}>취소</button>
                    <button onClick={handleClickPublishBtn}>발행</button>
                </div>
            </div>
        </div>
    )
});



export default Write;
import { useEffect, useRef } from "react";
import { Item, NextId } from "../types"

interface WriteProps {
    post?: Item;
    onCreate: (post:Item) => void;
    onUpdate: (post:Item) => void;
    onCancel: ()=>void;
}

function Write({post, onCreate, onUpdate, onCancel}:WriteProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (titleRef.current !== null && contentRef.current !== null) {
            if (post === undefined) {
                titleRef.current.value = '';
                contentRef.current.value = '';
            } else {
                titleRef.current.value = post.title;
                contentRef.current.value = post.content;
            }
        }
    },[]);

    const handleClickPublishBtn = () => {
        if ((titleRef.current !== null) && (contentRef.current !== null)) {
            if (titleRef.current.value !== '') {
                if (contentRef.current.value !== '') {
                    if(post === undefined){
                        const newPost:Item = {
                            id: NextId.getId(),
                            title: titleRef.current.value,
                            content: contentRef.current.value,
                            category: '',
                            date:'',
                        }
                        onCreate(newPost);
                    } else {
                        const newPost:Item = {
                            id: post.id,
                            title: titleRef.current.value,
                            content: contentRef.current.value,
                            category: '',
                            date:'',
                        }
                        onUpdate(newPost);
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
            <div className="title">
                <input ref={titleRef} placeholder="제목" type="text" />
            </div>
            <div className="content">
                <textarea ref={contentRef} placeholder="내용" />
            </div>
            <div className="publish">
                <button name="cancelBtn" onClick={()=>onCancel()}>취소</button>
                <button name="publishBtn" onClick={handleClickPublishBtn}>발행</button>
            </div>
        </div>
    )
}

Write.defaultProps ={
    post: undefined
};
export default Write;
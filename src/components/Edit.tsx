import { useEffect, useRef } from "react";
import { Item } from "../types"

interface EditProps {
    post: Item;
    onUpdate: (post:Item) => void;
    onCancel: ()=>void;
}

function Edit({post, onUpdate, onCancel}:EditProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(():void => {
        if ((titleRef.current !== null) && (contentRef.current !== null)) {
            titleRef.current.value = post.title;
            contentRef.current.value = post.content;
        }
    },[]);

    const handleClickPublishBtn = () => {
        if ((titleRef.current !== null) && (contentRef.current !== null)) {
            if (titleRef.current.value !== '') {
                if (contentRef.current.value !== '') {
                    const newPost:Item = {
                        id: post.id,
                        title: titleRef.current.value,
                        content: contentRef.current.value,
                        category: '',
                        date:'',
                    }
                    onUpdate(newPost);
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
            <div>
                <button name="cancelBtn" onClick={()=>onCancel()}>취소</button>
                <button name="publishBtn" onClick={handleClickPublishBtn}>발행</button>
            </div>
        </div>
    )
}

export default Edit;
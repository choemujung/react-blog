import { useRef } from "react";
import { idText } from "typescript";
import { Item } from "../types"

interface WriteProps {
    nextId: number;
    onCreate: (post:Item) => void
}

function Write({nextId, onCreate}:WriteProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);

    const handleClickPublishBtn = () => {
        if ((titleRef.current !== null) && (contentRef.current !== null)) {
            if (titleRef.current.value !== '') {
                if (contentRef.current.value !== '') {
                    const newPost:Item = {
                        id: nextId,
                        title: titleRef.current.value,
                        content: contentRef.current.value,
                        category: '',
                        date:'',
                    }
                    onCreate(newPost);
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
                <input ref={contentRef} placeholder="내용" type="text" />
            </div>
            <div className="publish">
                <button name="publishBtn" onClick={handleClickPublishBtn}>발행</button>
            </div>
        </div>
    )
}

export default Write;
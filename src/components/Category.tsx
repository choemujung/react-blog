import { observer } from "mobx-react";
import { ChangeEvent, useRef, useState } from "react";
import categoryStore from "../store/category";
import filterStore from "../store/filter";
import { Item } from "../types";

interface Props {
    setSelected ?: (item:string) => void;
    post?:Item;
}

const Category = observer(({setSelected, post}:Props) => {
    const categories = categoryStore.categories;

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement> ) => {
        (setSelected!==undefined) && setSelected(e.target.value);
    }
    return (
        <div>
            <select onChange={handleSelect}>
                <option value="none">전체</option>
                {
                    categories.map(item =>
                        <option value={item} key={item}>{item}</option>
                    )
                }
            </select>
        </div>
    )
});

export default Category;
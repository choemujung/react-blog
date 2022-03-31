import React from "react";
import Home from './components/Home';
import Detail from './components/Detail';
import PostList from './components/PostList';
import Search from './components/Search';
import Write from './components/Write';
import { observer } from 'mobx-react';

import postStore from './store/post';
import filterStore from "./store/filter";

const App = observer(() => {
  switch(postStore.currentView) {
    case 'Home' :
      return (
        <Home posts={postStore.posts}/>
      )
    case 'Update':
      return (
        <div>
          <Home posts={postStore.posts}/>
          <Write post={postStore.editingPost} />
        </div>
      )
    case "Create":
      return (
        <div>
          <Home posts={postStore.posts}/>
          <Write />
        </div>
      )
    case 'Search':
      return (
        <Home posts={postStore.filteredPosts}/>
      )
    case 'Detail' :
      return (
        <div>
          <Home posts={postStore.posts}/>
          <Detail/>
        </div>
      )
    case 'Category' :
      return (
        <div>
          <Home posts={filterStore.getFilteredList}/>
        </div>
      )
  }
});

export default App;
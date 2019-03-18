import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

const baseUrl = "https://practiceapi.devmountain.com/api"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(baseUrl + '/posts')
    .then(response => this.setState({posts: response.data}))
    
  }

  updatePost(id, text) {
    axios.put(`${ baseUrl }/posts/?id=${ id }`, { text })
    .then(response => {
      this.setState({ 
        posts: response.data
      })
    })
    .catch(err => console.log(11111, err))
  }

  deletePost(id) {
    axios.delete(baseUrl + 'posts').then(res => console.log(11111, res))
    .catch(error => console.log("11111", error))
  }

  createPost() {

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {posts.map((post) => 
          <Post 
          text={post.text} 
          id={post.id} 
          date={post.date} 
          key={post.id}
          updatePostFn={ this.updatePost }
          />
          )}
        </section>
      </div>
    );
  }
}

export default App;

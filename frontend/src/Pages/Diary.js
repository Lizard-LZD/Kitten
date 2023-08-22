import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getPosts,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  getPost,
  addComment,
  removeComment,
} from "../Redux/Reducers/PostSlice";

const Post = ({
  currentUser,
  post,
  onLike,
  onUnlike,
  onDelete,
  onView,
  onAddComment,
  onRemoveComment,
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
    setCommentText(""); // Clear comment text when toggling
  };

  const handleAddComment = () => {
    onAddComment(post._id, { text: commentText });
    setShowCommentInput(false); // Hide comment input after adding comment
    setCommentText(""); // Clear comment text
  };

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.text}</p>
      <button onClick={() => onLike(post._id)}>Like</button>
      <button onClick={() => onUnlike(post._id)}>Unlike</button>
      {currentUser && currentUser.toString() === post.user && (
        <button onClick={() => onDelete(post._id)}>Delete</button>
      )}
      <button onClick={() => onView(post._id)}>View</button>
      <button onClick={handleToggleCommentInput}>
        {showCommentInput ? "Cancel" : "Add Comment"}
      </button>
      {showCommentInput && (
        <div>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}
      {post.comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          {console.log(currentUser, comment)}
          {currentUser && currentUser.toString() === comment.user && (
            <button onClick={() => onRemoveComment(post._id, comment._id)}>
              Delete Comment
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const PostList = ({
  posts,
  onLike,
  onUnlike,
  onDelete,
  onView,
  onAddComment,
  onRemoveComment,
  currentUser,
}) => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          onLike={onLike}
          onUnlike={onUnlike}
          onDelete={onDelete}
          onView={onView}
          onAddComment={onAddComment}
          onRemoveComment={onRemoveComment}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [text, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, text });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={text}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

const PostPage = ({
  posts,
  loading,
  getPosts,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  getPost,
  addComment,
  removeComment,
  currentUser,
}) => {
  useEffect(() => {
    getPosts();
  }, [posts]);

  const handleCreatePost = (formData) => {
    createPost(formData);
  };

  const handleLikePost = (postId) => {
    likePost(postId);
  };

  const handleUnlikePost = (postId) => {
    unlikePost(postId);
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  const handleGetPost = (postId) => {
    getPost(postId);
  };

  const handleAddComment = (postId, formData) => {
    addComment(postId, formData);
  };

  const handleRemoveComment = (postId, commentId) => {
    removeComment(postId, commentId);
  };

  return (
    <div>
      <h1>Post Management</h1>
      <PostForm onSubmit={handleCreatePost} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PostList
          posts={posts}
          onLike={handleLikePost}
          onUnlike={handleUnlikePost}
          onDelete={handleDeletePost}
          onView={handleGetPost}
          onAddComment={handleAddComment}
          onRemoveComment={handleRemoveComment}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.post.loading,
  currentUser: state.login.currentUser,
});

const mapDispatchToProps = {
  getPosts,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  getPost,
  addComment,
  removeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);

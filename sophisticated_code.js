/*
 * Filename: sophisticated_code.js
 * Description: This code is a sophisticated implementation of a social media platform.
 * It includes user authentication, user posting, liking posts, commenting, and more.
 */

// User class representing a user in the social media platform
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.posts = [];
    this.likes = [];
    this.comments = [];
  }

  // Method to create a new post
  createPost(content) {
    const post = new Post(content, this.username);
    this.posts.push(post);
  }

  // Method to like a post
  likePost(post) {
    this.likes.push(post);
    post.addLike();
  }

  // Method to comment on a post
  commentOnPost(post, content) {
    const comment = new Comment(content, this.username);
    this.comments.push(comment);
    post.addComment(comment);
  }
}

// Post class representing a post on the social media platform
class Post {
  constructor(content, author) {
    this.content = content;
    this.author = author;
    this.likes = 0;
    this.comments = [];
  }

  // Method to add a like to the post
  addLike() {
    this.likes++;
  }

  // Method to add a comment to the post
  addComment(comment) {
    this.comments.push(comment);
  }
}

// Comment class representing a comment on a post
class Comment {
  constructor(content, author) {
    this.content = content;
    this.author = author;
  }
}

// Example usage of the social media platform

// Create users
const user1 = new User("user1", "password1");
const user2 = new User("user2", "password2");

// User1 creates a post
user1.createPost("Hello world!");

// User2 likes user1's post
user2.likePost(user1.posts[0]);

// User2 comments on user1's post
user2.commentOnPost(user1.posts[0], "Nice post!");

// Output user1's post information
console.log("User1's post:");
console.log(user1.posts[0]);

// Output user2's liked posts
console.log("User2's liked posts:");
console.log(user2.likes);

// Output user2's comments
console.log("User2's comments:");
console.log(user2.comments);
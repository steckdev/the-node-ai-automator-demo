// Legacy User Service - BEFORE AI Refactoring
// This is intentionally messy code for Demo 1

const fs = require('fs');
const crypto = require('crypto');

// Magic numbers and strings scattered throughout
const USERS_FILE = './data/users.json';
const POSTS_FILE = './data/posts.json';

class UserService {
  constructor() {
    this.users = [];
    this.posts = [];
    this.loadData();
  }

  // Callback hell example
  loadData() {
    fs.readFile(USERS_FILE, 'utf8', (err, userData) => {
      if (err) {
        console.log('Error loading users:', err);
        this.users = [];
      } else {
        try {
          this.users = JSON.parse(userData);
        } catch (parseErr) {
          console.log('Error parsing users:', parseErr);
          this.users = [];
        }
      }

      fs.readFile(POSTS_FILE, 'utf8', (err, postData) => {
        if (err) {
          console.log('Error loading posts:', err);
          this.posts = [];
        } else {
          try {
            this.posts = JSON.parse(postData);
          } catch (parseErr) {
            console.log('Error parsing posts:', parseErr);
            this.posts = [];
          }
        }
      });
    });
  }

  // Inconsistent error handling
  getUserById(id, callback) {
    if (!id) {
      return callback(new Error('ID is required'));
    }

    if (isNaN(id)) {
      callback(new Error('Invalid ID format'));
      return;
    }

    const user = this.users.find(u => u.id == id); // == instead of ===
    
    if (!user) {
      return callback(null, null); // Inconsistent error pattern
    }

    // Nested callback for posts
    this.getUserPosts(id, (err, posts) => {
      if (err) {
        console.log('Error getting posts:', err);
        posts = []; // Swallow error
      }
      
      callback(null, {
        ...user,
        posts: posts
      });
    });
  }

  // More callback nesting
  getUserPosts(userId, callback) {
    setTimeout(() => { // Simulated async operation
      const userPosts = this.posts.filter(p => p.userId == userId);
      callback(null, userPosts);
    }, 100);
  }

  // Inline validation and business logic mixed
  createUser(userData, callback) {
    // Validation scattered throughout
    if (!userData.email || userData.email.indexOf('@') === -1) {
      return callback(new Error('Invalid email'));
    }

    if (!userData.name || userData.name.length < 2) {
      callback(new Error('Name too short'));
      return;
    }

    if (!userData.password || userData.password.length < 6) {
      return callback(new Error('Password too short'));
    }

    // Check if email exists (nested callback)
    this.findUserByEmail(userData.email, (err, existingUser) => {
      if (err) {
        return callback(err);
      }

      if (existingUser) {
        return callback(new Error('Email already exists'));
      }

      // Hash password inline
      const salt = crypto.randomBytes(16).toString('hex');
      crypto.pbkdf2(userData.password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
          return callback(err);
        }

        const newUser = {
          id: this.users.length + 1, // Not thread-safe
          name: userData.name,
          email: userData.email,
          password: derivedKey.toString('hex'),
          salt: salt,
          createdAt: new Date().toISOString(),
          isActive: true
        };

        this.users.push(newUser);

        // Save to file (another callback)
        this.saveUsers((saveErr) => {
          if (saveErr) {
            console.log('Error saving user:', saveErr);
            // Remove from memory if save failed
            this.users.pop();
            return callback(saveErr);
          }

          callback(null, {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt
          });
        });
      });
    });
  }

  findUserByEmail(email, callback) {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    callback(null, user);
  }

  saveUsers(callback) {
    fs.writeFile(USERS_FILE, JSON.stringify(this.users, null, 2), callback);
  }

  // Mixed sync/async patterns
  getAllUsers() {
    return this.users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive
    }));
  }

  // No error handling
  deleteUser(id, callback) {
    const index = this.users.findIndex(u => u.id == id);
    this.users.splice(index, 1);
    this.saveUsers(callback);
  }
}

module.exports = UserService;

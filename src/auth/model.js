'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'editor', 'user'],
  },
});

const capabilities = {
  user: ['read'],
  editor: ['read', 'update'],
  admin: ['create', 'read', 'update', 'delete'],
};

userSchema.post('init', function(next) {
  this.capabilities = capabilitites[this.role] || [];
});

userSchema.methods.generateToken = function() {
  let tokenData = {
    id: this._id,
    capabilities: this.capabilities,
  };
  return jwt.sign(tokenData, process.env.SECRET);
};

export default mongoose.model('users', userSchema);
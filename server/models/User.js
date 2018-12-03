const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, unique: true, match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
  password: String,
  username: {type: String, default:""},
  resetPasswordExpires: Number,
  resetPasswordToken: String,
  confirmationCode: String,
  imgName: {type: String, default:""},
  imgPath: {type: String,  default:""},
  public_id: {type: String, default:""},
  status: {type: String, enum: ["active", "inactive"], default: "inactive"}
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  title: { type: String, required: true },
  pictures: [String],
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  // address: {
  //   street: String,
  //   city: String,
  //   country: String,
  // },
  location: {
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true }
  },
  _owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;

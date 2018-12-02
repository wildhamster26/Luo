const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerPeriod: { type: Number, required: true },
  period: { type: String, enum: ['hour', 'day', 'month'], default: 'day' },
  categories: [String],
  // pictureUrl: {type: String,  default:""},
  imgName: {type: String, default:""},
  imgPath: {type: String,  default:""},
  public_id: {type: String, default:""},
  // address: {
  //   street: String,
  //   city: String,
  //   country: String,
  // },
  reservedDates: [Date],
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

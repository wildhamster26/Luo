const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'User' },
  _borrower: { type: Schema.Types.ObjectId, ref: 'User' },
  _item: { type: Schema.Types.ObjectId, ref: 'Item' },
  requestedDates: [Date],
  status: {type: String, enum: ["pending", "declined", "accepted"], default: "pending"}
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;

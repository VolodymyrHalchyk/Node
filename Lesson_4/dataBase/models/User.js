const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  _car: { type: Schema.Types.ObjectId },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true });

userSchema.virtual('info').get(function() {
  return `${this.name} ${this.age}`;
});

userSchema.virtual('userCar', {
  ref: 'Car',
  localField: '_car',
  foreignField: '_id',
});

userSchema.pre('find', function() {
  this.populate('userCar');
})
  .pre('findOne', function() {
    this.populate('userCar');
  });

module.exports = model('User', userSchema);

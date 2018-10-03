var mongoose = require('mongoose');
var Schema = mongoose.Schema,ObjectId = Schema.ObjectId;

var itemSchema = new Schema({
    asin: String,
    productTitle: String,
    rating: String,
    totalReview: Number,
    price: String,
    recentReviews: Array
});

export default mongoose.model('Item', itemSchema);
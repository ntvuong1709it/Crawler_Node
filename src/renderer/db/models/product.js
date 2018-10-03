var mongoose = require('mongoose');
var Schema = mongoose.Schema,ObjectId = Schema.ObjectId;

var productSchema = new Schema({
    gl_product_group_desc: String,
    Subcategory: String,
    asin: String,
    upc1: String,
    item_name: String,
    merchant_brand_name: String,
    customer_average_review_rating: String,
    customer_review_count: String,
    has_fba_offer: String,
    has_retail_offer: String,
    total_offers: Number,
    min_price: Number,
    max_price: Number,
    min_3p_price: Number,
    max_3p_price: Number,
    seller: String
});

export default mongoose.model('product', productSchema);
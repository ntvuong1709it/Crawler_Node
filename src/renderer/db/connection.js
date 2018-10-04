var mongoose = require('mongoose');
import Item from '../db/models/item';
import { DB } from '../common/config';

class DbConnection {
    url = DB.DB_URL;

    connect() {
        mongoose.connect(this.url, { useNewUrlParser: true });
        mongoose.set('useFindAndModify', false);
    }
    save(item) {
        var itemModel = new Item();

        itemModel.productTitle = item.productTitle;
        itemModel.rating = item.rating;
        itemModel.totalReview = item.totalReview;
        itemModel.price = item.price;
        itemModel.asin = item.asin;
        itemModel.recentReviews = item.recentReviews;
        itemModel.createdTimeOnUtc = item.createdTimeOnUtc;
        itemModel.modifiedTimeOnUtc = item.modifiedTimeOnUtc;

        itemModel.save();
    }
    findOneAndUpdate(item) {
        var query = { asin : item.asin };

        var itemToUpdate = {};
        itemToUpdate = Object.assign(itemToUpdate, item._doc);
        itemToUpdate.modifiedTimeOnUtc = new Date().toUTCString()
        delete itemToUpdate._id;

        console.log(itemToUpdate)
        
        Item.findOneAndUpdate(query, itemToUpdate, (err, doc) => {
            if(err) {
                this.handleFailure(err);
                return;
            }
                
            if(!doc) {
                console.log('Item does not existed. Create new record')
                itemToUpdate.createdTimeOnUtc = new Date().toUTCString()
                this.save(itemToUpdate);
            }

            return doc;
        });
    }
    handleFailure(err) {
        // TODO: Write logs
        console.log(err);
    }
}

export default DbConnection;
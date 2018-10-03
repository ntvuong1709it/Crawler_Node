var mongoose = require('mongoose');
import Item from '../db/models/item';

class DbConnection {
    connect(url) {
        mongoose.connect(url, { useNewUrlParser: true });
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

        itemModel.save();
    }
    findOneAndUpdate(item) {
        var query = { asin : item.asin };

        var itemToUpdate = {};
        itemToUpdate = Object.assign(itemToUpdate, item._doc);
        delete itemToUpdate._id;
        console.log(itemToUpdate)
        
        Item.findOneAndUpdate(query, itemToUpdate, (err, doc) => {
            if(err) {
                this.handleFailure(err);
                return;
            }
                
            if(!doc) {
                console.log('Item does not existed. Create new record')
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
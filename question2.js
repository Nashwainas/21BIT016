const express = require('express');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 3000;

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const itemSchema = new mongoose.Schema({
    name: String,
    prid:Number,
    price:Number,
    category:String,
    rating:Number,
    discount:Number,
    Availability:String

});
const Item = mongoose.model('Item', itemSchema);


for (let i = 1; i <= 10; i++) {
    const newItem = generateFakeItem();
    Item.create(newItem);
}


function generateFakeItem() {
    return {
        name: faker.commerce.productName(),
        prid:faker.number.int({'min':0,'max':100}),
        price:faker.number.int({'min':18,'max':10000}),
        category:faker.commerce.department(),
        rating:faker.number.int({'min':0,'max':5}),
        discount:faker.number.float({'min':10.0,'max':90.0}),
        Availability:"yes"
    };
}
function binsort(item){
    for(let i=0;i<item.length;i++){
        for(let j=0;j<item.length-i-1;j++){
        if(item[j].prid>item[j+1].prid){
         [item[j], item[j + 1]] = [item[j + 1], item[j]];
        }

    }
}
return item;
}

app.get('/items/categories/:categoryname/products/:productid', async (req, res) => {
    try {
        const items = await Item.find(({category:req.params.categoryname}));
        res.json(binsort(items));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

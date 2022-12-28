const _ = require('lodash')
const { Product, validatePro } = require('../models/product')
const formidable = require('formidable')
const fs = require('fs')

module.exports.createProduct = async (req, res) => {
    // req.body
    // but here we will use file(image) also , so we need a package called formidable

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    // keep file extension.
    form.parse(req, (err, fields, files) => {

        if (err) return res.status(400).send("Something went wrong !")
        const { error } = validatePro(_.pick(fields, ['name', 'description', 'price', 'category', 'quantity']));
        if (error) return res.status(400).send(error.details[0].message)

        const product = new Product(fields);

        if (files.photo) {
            // input type file & name 'photo' than find it.
            fs.readFile(files.photo.filepath, (err, data) => {
                if (err) return res.status(400).send("problem in file Data")
                product.photo.data = data;
                // console.log(files.photo.mimetype);
                product.photo.contentType = files.photo.mimetype;
                product.save((err, result) => {
                    //  here try catch don't work becase it's in a if condition , but we can use callback here like that. 
                    if (err) res.status(500).send("internal server error !")
                    else return res.status(201).send({
                        message: "product Created Successfully !",
                        data: _.pick(result, ['name', 'description', 'price', 'category', 'quantity'])
                    })
                })
            })
        } else {
            return res.status(400).send('no image provided !')

        }
    })

}

// query String . 
// api/porduct?order=desc&sortBy=name&limit=10

module.exports.getProduct = async (req, res) => {
    let order = req.query.order === 'desc' ? -1 : 1;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    // let currentPage= req.query.currentPage?parseInt(currentPage):1;
    // console.log(order, sortBy, limit,currentPage)
    let page=req.query.currentPage?parseInt(req.query.currentPage):1;
    let skips=0;
    if(page>1){
        skips=limit*(page-1)
    }
    const products = await Product.find()
        .select({ photo: 0, description: 0 })
        .sort({ [sortBy]: order })
        .skip()
        .limit()
        .populate('category', "name createdAt");
    return res.status(200).send(products)
}

module.exports.getProductById = async (req, res) => {
    const products = await Product.findById(req.params.id).select({ photo: 0 }).populate('category', 'name')
    if (!products) return res.status(404).send("no product found !")
    return res.status(200).send(products)
}


module.exports.getPhoto = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
        .select({ photo: 1, _id: 0 })
    // we can write .select('photo -_id')
    res.set('Content-Type', product.photo.contentType)
    return res.status(200).send(product.photo.data)
}

//  get Product By Id . 
//  Collect form Data .
//  update Provided Form Fields .
//  Update Photo (If Provided) .

module.exports.updateProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)

    let form = new formidable.IncomingForm();//function for form collection.
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send('something wrong ! 🤦‍♂️')
        const updatedFields = _.pick(fields, ['name', 'description', 'price', 'category', 'quantity']);
        _.assignIn(product, updatedFields);// like patch. update the changes only.

        if (files.photo) {
            // console.log(files.photo)
            fs.readFile(files.photo.filepath, (err, data) => {
                if (err) return res.status(400).send('something wrong ! 🤦‍♂️')
                product.photo.data = data,
                    product.photo.contentType = files.photo.mimetype;
                product.save((err, result) => {
                    if (err) return res.status(500).send('something failed 🤦‍♂️')
                    else return res.status(200).send({
                        message: "product Updated successfully."
                    })
                })
            }) 
        } else {
            product.save((err, result) => {
                if (err) return res.status(500).send('something failed 🤦‍♂️')
                else return res.status(200).send({
                    message: "product Updated successfully."
                })
            })
        }

    })


}

// filter by any fields


/*

const body ={
    order:'desc',
    sortBy:'price',
    limit:6,
    skip:20,
    filters:{
        price:[1000,2000]
        catagory:['64cc11112412907184','sgask234324dddddddd23','234sdhgdddshg345']
    }
}



*/



module.exports.filterProduct = async (req, res) => {
    let order = req.body.order === 'desc' ? -1 : 1;
    let sortBy = req.body.sortBy ? req.query.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = parseInt(req.body.skip);


    let filters = req.body.filters;
    let args = {}

    for (let key in filters) {

        if (filters[key].length > 0) {
            if (key === 'price') {
                // {price:{$gte:0,$lte:1000}}
                args['price'] = {
                    $gte: filters['price'][0],
                    $lte: filters['price'][1]
                }
                // console.log(args);

            }
            if (key === 'category') {
                // category : {$in['so','me','thin','ng']}
                args['category'] = {
                    $in: filters['category']
                }
                // console.log(args)
            }
        }
    }


    const products = await Product.find(args)
        .select({ photo: 0 })
        .populate('category', 'name')
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)

    return res.status(200).send(products)
}

module.exports.totalProduct=async(req,res)=>{
    const total = await Product.count();
    res.send({total})
}
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc Fetch all products
//@route GET /api/products
//access public

const getProducts = asyncHandler(async(req,res) =>{

const pageSize = 6;
const page = Number(req.query.pageNumber) || 1
console.log(page);
console.log(req.query.keyword);


/* search functionality
    const keyword = req.query.keyword ? {
        name: {
           $regex: req.query.keyword,
           $option: 'i'
        }
    }: {} */
    const keyword = req.query.keyword ? { name: new RegExp(req.query.keyword, 'i')} :{}

/* search functionality ends */
   const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    res.json({products, page, pages:Math.ceil(count / pageSize)});

}) 


//@desc Fetch single products using id
//@route GET /api/products/:id
//access public

const getProductById = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id);

    if(product){
       res.json(product);
    }else{
     res.status(404);
     throw new Error('Product not Found')
    }


})


//@desc  DELETE SINGLE PRODUCT
//@route DELETE /api/products/:id
//access Private/Admin

const deleteProduct = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id);

    if(product)
    {
        await product.remove();
        res.json({message: 'Product removed'})
    }
    else
    {
        res.status(404);
        throw new Error('Product not Found')
    }


})


//@desc  CREATE PRODUCT
//@route POST /api/products
//access Private/Admin
const createProduct = asyncHandler(async (req,res) =>{

   {/* const { name, image, description, brand, category, price, countInStock } = req.body; */}
    
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description:'Sample description'
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

})


//@desc  UPDATE PRODUCT
//@route PUT /api/products/:id
//access Private/Admin

const updateProduct = asyncHandler(async (req,res) =>{

     const { name,price,description,image,brand,category,countInStock } = req.body;
     
     const product = await Product.findById(req.params.id);

     if(product)
     {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock


     const updateProduct = await product.save();
     res.json(updateProduct);
     } 
     else 
     {
       res.status(404);
       throw new Error('Product not found');
     }
 
     
 
 })

 //@desc Create New Review
//@route POST /api/products/:id/reviews
//access Private

const createProductReview = asyncHandler(async (req,res) =>{

    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);

    if(product)
    {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if(alreadyReviewed){
        res.status(400)
        throw new Error('Product already reviewed')
    }
    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    }
    product.reviews.push(review);

    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length

    await product.save();
    res.status(201).json({message: 'Review Added'});
    } 
    else 
    {
      res.status(404);
      throw new Error('Product not found');
    }

    

})



//@desc Get Top Rated Products
//@route GET /api/products/top
//access Private

const getTopProducts = asyncHandler(async (req,res) =>{

    const products = await Product.find({}).sort({rating:-1}).limit(3);
    res.json(products)    

})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts}
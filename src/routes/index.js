const { Router } = require('express');
const router = Router();
const path = require('path');
const { unlink } = require('fs-extra');

const Image = require('../models/Image');

router.get('/', async (req, res) =>{
    const images = await Image.find();
    res.render('index',{ images: images} );
    //res.send('index Page');
});

router.get('/upload/image', (req, res)=>{
    res.render('uploads');
});

router.post('/upload/image', async (req, res) =>{
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.size = req.file.size;
    image.mimetype = req.file.mimetype;
    
    await image.save();
    //image.path = '/img/uploads' + req.file.fieldname;
    //res.send('uploaded');
    res.redirect('/');
});

router.get('/image/:id', async (req, res) =>{
    const { id } = req.params;
   const image = await Image.findById(id);   
   res.render('profile', {image});
});

router.get('/image/:id/delete', async (req, res) =>{
    const { id } = req.params;
   const image = await Image.findByIdAndDelete(id);
   await unlink(path.resolve('./src/public'+ image.path));
    res.redirect('/');
}); 

module.exports = router;
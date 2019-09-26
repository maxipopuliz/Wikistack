const express=require("express")
const router=express.Router();
const { addPage } = require("../views")
const {Page}=require('../models')
const {User}=require('../models')

function toSlug(title){
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.get('/',async(req,res,next)=>{
    // try{
    //     const data= await User.findAll()
    //     res.send(data.rows)
    // }catch(err){
    //     console.log(er
    // }
    res.send('it works')
})

router.post('/',async(req,res,next)=>{
    // try{
    //     const page = await Page.create(req.body)
    //     const user = await User.create(req.body)
    //     res.send(page)
    // }catch(err){
    //     console.log(err)
    // }
    
    //res.json(req.body)

    const page = new Page({
        title: req.body.title,
        slug:toSlug(req.body.title),
        content: req.body.content,
        status: req.body.status
      });

      const user = new User({
        name: req.body.name,
        email: req.body.email

      });
    
      // make sure we only redirect *after* our save is complete!
      // note: `.save` returns a promise.
      try {
        await page.save();
        await user.save();
        res.redirect('/');
      } catch (error) { next(error) }
})

router.get('/add',async(req,res)=>{
    res.send(addPage())
})

module.exports=router
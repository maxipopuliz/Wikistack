const express=require("express")
const router=express.Router();
const { addPage } = require("../views")
const {Page}=require('../models')
const {User}=require('../models')
const { wikiPage } = require("../views")
const { main } = require('../views')



router.get('/',async(req,res,next)=>{
    try{
        const pages = await Page.findAll()
        res.send(main(pages))
    }catch(err){
        console.log(err)
    }
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
        slug: req.body.slug,
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
        res.redirect(`/wiki/${page.slug}`);
      } catch (error) { res.send('DOESNT work') }
})

router.get('/add',async(req,res)=>{
    res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
  let page = 'did not work'
  try{
    let auth = 'dan';
      page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    // if(page.userid === userId){
      
      user = await User.findOne({
        where: {
          id: page.id
        }
      })

      auth = user.name
    // }

    res.send(wikiPage(page, auth));
  } catch (error) {console.log("Testing Slug Failed")}
});



module.exports=router
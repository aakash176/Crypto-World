const express = require('express')
const router = express.Router()
const Wishlist = require('../Schema/wishlistSchema')
router.post('/add_wishlist', async(req,res) => {
    try {
        const email = JSON.stringify(req.body.email)
        const crypto_id = JSON.stringify(req.body.crypto_id)
        await Wishlist.create({
            email,
            crypto_id
            
        })
        res.send({message:"added to the list", crypto_id})
    } catch (error) {
        res.send("error while adding wishlist", error)
    }
})

router.post('/get_wishlist', async(req,res) => {
    try {
        const email = JSON.stringify(req.body.email)
        const wishlist_list = await Wishlist.findOne({email})
        if(!wishlist_list){
            res.status(204).send({message:"No wishlist"})
        }
        res.status(200).send(wishlist_list)
    } catch (error) {
        res.send("error while getting wishlist", error)
    }
})

module.exports = router

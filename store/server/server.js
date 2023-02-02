const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors({origin: true, credentials: true}));

const stripe = require("stripe")("sk_test_51MX1Z8BAs3evRfTMFvEUBT61lFwB7uLDEScSpi2PKQynUnrmO4o0k2hL6rLjhWsvIsbsx6Zt8LppnDqlpDXk9Lfo00PpdFM5Tk");

app.post('/checkout', async (req, res, next)=>{
    try {
        const session = await stripe?.checkout.session?.create({
            line_items: req.body.items.map((item)=>({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: "http://localhost:4242/success.html",
            cancel_url: "http://localhost4242/cancel.html",
        })
        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
})

app.listen(4242, ()=>{
    console.log('app is running at port 4242')
})
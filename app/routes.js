var nodemailer = require('nodemailer');
const path = require('path');
// var xml = require('xml');
// const fetch = require("node-fetch");
const
{
    GoogleSpreadsheet
} = require('google-spreadsheet');
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
// const admin = require('firebase-admin');
// const serviceAccount = require('../parallels-firebase.json');
// var CronJob = require('cron').CronJob;
// const cron = require("node-cron");
// admin.initializeApp(
// {
//     credential: admin.credential.cert(serviceAccount)
// });
// const db = admin.firestore();
// const doc = new GoogleSpreadsheet('1c_PGZSFLDa2gVdoexJCu7VZxPhSRvy72vITcEDuwH8g');
// const Shopify = require('shopify-api-node');
// let accessToken = '';
let tokenExpiration = 0;
// const shopify = new Shopify(
// {
//     shopName: 'phuljadi.myshopify.com',
//     apiKey: 'ab72dfbaad5d17c725a49090bed2d5f5',
//     password: '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'
// });
module.exports = function(app)
{
    const openai = require('openai'); // Import OpenAI SDK
    openai.apiKey = process.env.OPENAI_API_KEY; // Set your OpenAI API Key
    let conversations = {}; // Object to store conversation states
    

    app.post('/slack/events', async(req, res) =>
    {

        if (req.body.challenge)
        {
            return res.status(200).send(req.body.challenge);
        }
        
        // Respond in Slack (implement the Slack response logic here)
        // res.status(200).end(); // Send a response back to Slack
    });

    app.post('/slack/command', async (req, res) => 
    {

       const { Configuration, OpenAI } = require("openai");

        const openai = new OpenAI({
              apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
            });

        const commandText = req.body.text; // Text that comes with the command
        const commandUser = req.body.user_name; // Username who invoked the command
        const channelName = req.body.channel_name
        const channelId = req.body.channel_id; // Channel where the command was invoked
        const message = req.body.text;


        if (!conversations[channelName])
        {
            conversations[channelName] = []; // Initialize a new conversation state
        }

         conversations[channelName].push(
        {
            "role": "user",
            "content": message
        });
        // Call ChatGPT API
        const chatGptResponse = await openai.chat.completions.create(
        {
            model: "gpt-3.5-turbo", // Replace with your model version
            messages: conversations[channelName]
        });
        // Add ChatGPT's response to the conversation state
        conversations[channelName].push(chatGptResponse.choices[0].message); 

        res.status(200).send("Received your command!"); // Acknowledge the command
    });

    app.get('/brandbind', function(req, res)
    {
        res.render('brandbind.html')
    })
    app.get('/', function(req, res)
    {
        res.render("index.html")
    });
    // app.get('/about', function(req, res) {
    //     res.render("about-us.html")
    // });
    app.post('/phuljhadi-app', function(req, res)
    {
        return 401;
    })
    app.get('/phuljhadi-app', function(req, res)
    {
        return 401;
    })
    app.post('/phuljhadi', function(req, res)
    {
        var cartitems = req.body;
        // res.writeHead(200, { 'Content-Type': 'application/json' }); 
        // console.log(cartitems)
        // res.send('Done');
        // res.end(JSON.stringify({number:1}));
        // req.send(200)
        // res.status(200).send('some text');
        // console.log("aa",cartitems.discountamount,parseInt(cartitems.discountamount) );
        if (cartitems.discountamount != 0)
        {
            // parseInt(a.replace(/,/g, ''), 10);
            var amount = cartitems.discountamount;
            // console.log(amount);
            var amountreplaced = amount.replace(/,/g, '');
            var removefirst2 = parseInt(amountreplaced.slice(2));
            // console.log("parse",parseInt(removefirst2));
            //  var positive = Math.abs(parseInt(amount));
            //  console.log(positive);
            //  var pricewithoutdollar = positive.toString().replace(/,/g, '');
            // console.log(pricewithoutdollar)
            //  var finalamount = parseInt(pricewithoutdollar);
            //  console.log(finalamount)
            phuljhadi(res, cartitems.resp, cartitems.discountcode, removefirst2)
        }
        else phuljhadi(res, cartitems.resp, "Messold", 0)
    });

    function phuljhadi1(res, phuljhadicart, discountcode, discountamount)
    {
        var thousand = 0;
        var thousandqty = 0;
        var fifteenhundred = 0;
        var fifteenhundredqty = 0;
        var discount = discountamount;
        var lt = {
            "draft_order":
            {
                "line_items": []
            }
        }
        console.log("Cart Size : ", phuljhadicart.items.length);
        console.log("1st Item:", phuljhadicart.items[0])
        for (var i = 0; i < phuljhadicart.items.length; i++)
        {
            console.log(i, "Product Type :", phuljhadicart.items[i].product_type)
            if (phuljhadicart.items[i].product_type == 1000)
            {
                thousand = thousand + (parseInt(phuljhadicart.items[i].final_line_price) / 100);
                thousandqty = thousandqty + parseInt(phuljhadicart.items[i].quantity);
            }
            else if (phuljhadicart.items[i].product_type == 1500)
            {
                fifteenhundred = fifteenhundred + (parseInt(phuljhadicart.items[i].final_line_price) / 100);
                fifteenhundredqty = fifteenhundredqty + parseInt(phuljhadicart.items[i].quantity);
            }
            else
            {
                // console.log(phuljhadicart.items[i].discounts)
                //need clearity
                discount = discount + (parseInt(phuljhadicart.items[i].total_discount) / 100);
                // console.log(discount,"Final");
            }
            lt['draft_order']['line_items'].push(
            {
                'variant_id': phuljhadicart.items[i].variant_id,
                'quantity': phuljhadicart.items[i].quantity
            })
        }
        if (thousandqty >= 2)
        {
            var remainder = thousandqty % 3;
            if (remainder == 2)
            {
                discount = discount + 598;
                discount = discount + (Math.floor(thousandqty / 3) * 1097);
            }
            else
            {
                discount = discount + (Math.floor(thousandqty / 3) * 1097);
            }
        }
        if (fifteenhundredqty >= 2)
        {
            var remainder = fifteenhundredqty % 3;
            if (remainder == 2)
            {
                discount = discount + 300;
                discount = discount + (Math.floor(fifteenhundredqty / 3) * 750);
            }
            else
            {
                discount = discount + (Math.floor(fifteenhundredqty / 3) * 750);
            }
        }
        console.log("total discount", discount)
        // discount = 0;
        if (discount > 0)
        {
            lt['draft_order']['applied_discount'] = {
                "description": "Custom discount",
                "value_type": "fixed_amount",
                "value": discount,
                "amount": discount,
                "title": discountcode
            };
            // console.log(JSON.stringify(lt))
            var request = require("request");
            var options = {
                method: 'POST',
                url: 'https://phuljadi.myshopify.com/admin/api/2023-04/draft_orders.json',
                headers:
                {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": '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'
                },
                json: true,
                body: lt
            };
            request(options, function(error, response, body)
            {
                console.log("---------->", JSON.stringify(lt))
                // console.log(body,access_token,orderNumber)
                if (error) throw new Error(error);
                else
                {
                    console.log(body)
                    console.log("sending", body.draft_order.invoice_url)
                    res.status(200).send(body.draft_order.invoice_url);
                    // res.send(body.draft_order.invoice_url)
                    // console.log(body)
                }
            });
        }
        else
        {
            var request = require("request");
            var options = {
                method: 'POST',
                url: 'https://phuljadi.myshopify.com/admin/api/2023-04/draft_orders.json',
                headers:
                {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": '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'
                },
                json: true,
                body: lt
            };
            request(options, function(error, response, body)
            {
                console.log("---------->", JSON.stringify(lt))
                if (error) throw new Error(error);
                else
                {
                    console.log("sending", body.draft_order.invoice_url)
                    res.status(200).send(body.draft_order.invoice_url);
                    // res.send(body.draft_order.invoice_url)
                    // console.log(body)
                }
            });
            // res.send("Server listening on PORT")
        }
    }

    function phuljhadi(res, phuljhadicart, discountcode, discountamount)
    {
        var thousand = 0;
        var thousandqty = 0;
        var fifteenhundred = 0;
        var fifteenhundredqty = 0;
        var discount = discountamount;
        var lt = {
            "draft_order":
            {
                "line_items": []
            }
        }
        // console.log("Cart Size : ",phuljhadicart.items.length);
        // console.log("1st Item:",phuljhadicart.items[0])
        for (var i = 0; i < phuljhadicart.items.length; i++)
        {
            // console.log(i, "Product Type :",phuljhadicart.items[i].product_type)
            if (phuljhadicart.items[i].product_type == 1000)
            {
                thousand = thousand + (parseInt(phuljhadicart.items[i].final_line_price) / 100);
                thousandqty = thousandqty + parseInt(phuljhadicart.items[i].quantity);
            }
            else if (phuljhadicart.items[i].product_type == 1500)
            {
                fifteenhundred = fifteenhundred + (parseInt(phuljhadicart.items[i].final_line_price) / 100);
                fifteenhundredqty = fifteenhundredqty + parseInt(phuljhadicart.items[i].quantity);
            }
            else
            {
                // console.log(phuljhadicart.items[i].discounts)
                //need clearity
                discount = discount + (parseInt(phuljhadicart.items[i].total_discount) / 100);
                // console.log(discount,"Final");
            }
            lt['draft_order']['line_items'].push(
            {
                'variant_id': phuljhadicart.items[i].variant_id,
                'quantity': phuljhadicart.items[i].quantity
            })
        }
        if (thousandqty >= 2)
        {
            var remainder = thousandqty % 3;
            if (remainder == 2)
            {
                discount = discount + 598;
                discount = discount + (Math.floor(thousandqty / 3) * 1097);
            }
            else
            {
                discount = discount + (Math.floor(thousandqty / 3) * 1097);
            }
        }
        if (fifteenhundredqty >= 2)
        {
            var remainder = fifteenhundredqty % 3;
            if (remainder == 2)
            {
                discount = discount + 300;
                discount = discount + (Math.floor(fifteenhundredqty / 3) * 750);
            }
            else
            {
                discount = discount + (Math.floor(fifteenhundredqty / 3) * 750);
            }
        }
        // console.log("total discount",discount)
        // discount = 0;
        // if (discount > 0)
        // {
        lt['draft_order']['applied_discount'] = {
            "description": "Custom discount",
            "value_type": "fixed_amount",
            "value": discount,
            "amount": discount,
            "title": discountcode
        };
        // console.log(JSON.stringify(lt))
        var request = require("request");
        var options = {
            method: 'POST',
            url: 'https://phuljadi.myshopify.com/admin/api/2023-04/draft_orders.json',
            headers:
            {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": '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'
            },
            json: true,
            body: lt
        };
        request(options, function(error, response, body)
        {
            console.log(error, body)
            // console.log("---------->",JSON.stringify(lt))
            // console.log(body,access_token,orderNumber)
            if (error) throw new Error(error);
            else
            {
                console.log("sending", body)
                res.status(200).send(body.draft_order.invoice_url);
                res.send(body.draft_order.invoice_url)
                // console.log(body)
            }
        });
        // }
    }

    function refreshAccessToken()
    {
        const request = require('request');
        // Make a request to the Facebook Graph API's token refresh endpoint
        const refreshUrl = `https://graph.facebook.com/v16.0/oauth/access_token?grant_type=fb_exchange_token&client_id=781476460137533&client_secret=162862b014057c4b642725a5bcad7488&fb_exchange_token=${accessToken}`;
        request(refreshUrl, function(error, response, body)
        {
            if (error)
            {
                console.error('Error refreshing access token:', error);
                return;
            }
            // Parse the response body to extract the new access token and expiration time
            const data = JSON.parse(body);
            accessToken = data.access_token;
            tokenExpiration = Date.now() + data.expires_in * 1000; // Convert to milliseconds
            console.log('Access token refreshed', tokenExpiration);
        });
    }

    function checkAccessToken(req, res, next)
    {
        if (Date.now() >= tokenExpiration)
        {
            // Access token has expired, refresh it
            refreshAccessToken();
        }
        // Continue with the next middleware
        next();
    }
    // Middleware to use the refreshed access token in the request
    function useAccessToken(req, res, next)
    {
        req.accessToken = accessToken;
        next();
    }


     app.post('/old_development', function(req, res)
    {
        console.log(req.body)
        // res.status(200).send('Success')
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        
        const options = {
            method: 'POST',
            url,
            json:
            {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": LeadDetails.Phone,
                "type": "template",
                "template":
                {
                    "name": "development_oldclient",
                    "language":
                    {
                        "code": "en"
                    },
                    "components": [
                    {
                        "type": "header",
                        "parameters": [
                        {
                            "type": "image",
                            "image":
                            {
                                "link": "https://cdn.shopify.com/s/files/1/0522/6178/1673/files/245994106_23848844554410593_102379326518039829_n.png?v=1707726926"
                            }
                        }]
                    },
                    {
                        "type": "body",
                        "parameters": [
                        {
                            "type": "text",
                            "text": LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };

        
        // const options = {
        //     method: 'POST',
        //     url,
        //     json:
        //     {
        //         messaging_product: 'whatsapp',
        //         recipient_type: 'individual',
        //         to: LeadDetails.Phone,
        //         type: 'template',
        //         template:
        //         {
        //             name: 'development_oldclient',
        //             language:
        //             {
        //                 code: 'en'
        //             },
        //             components: [
        //             {
        //                 type: 'body',
        //                 parameters: [
        //                 {
        //                     type: 'text',
        //                     text: LeadDetails.FirstName
        //                 }]
        //             }]
        //         }
        //     }
        // };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error, body);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                res.status(200).send('Success')
                console.log(body);
            }
        });
    })

    app.post('/old_marketing', function(req, res)
    {
        console.log(req.body)
        
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        
        const options = {
            method: 'POST',
            url,
            json:
            {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": LeadDetails.Phone,
                "type": "template",
                "template":
                {
                    "name": "marekting_reminderold",
                    "language":
                    {
                        "code": "en"
                    },
                    "components": [
                    {
                        "type": "header",
                        "parameters": [
                        {
                            "type": "image",
                            "image":
                            {
                                "link": "https://cdn.shopify.com/s/files/1/0522/6178/1673/files/245978267_23848844557680593_7936746495059922109_n.png?v=1707726926"
                            }
                        }]
                    },
                    {
                        "type": "body",
                        "parameters": [
                        {
                            "type": "text",
                            "text": LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };
        // const options = {
        //     method: 'POST',
        //     url,
        //     json:
        //     {
        //         messaging_product: 'whatsapp',
        //         recipient_type: 'individual',
        //         to: LeadDetails.Phone,
        //         type: 'template',
        //         template:
        //         {
        //             name: 'marekting_reminderold',
        //             language:
        //             {
        //                 code: 'en'
        //             },
        //             components: [
        //             {
        //                 type: 'body',
        //                 parameters: [
        //                 {
        //                     type: 'text',
        //                     text: LeadDetails.FirstName
        //                 }]
        //             }]
        //         }
        //     }
        // };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error, body);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                res.status(200).send('Success')
                console.log(body);
            }
        });
    })

    app.post('/sales_welcome_message', function(req, res)
    {
        res.status(200).send('Success')
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        const options = {
            method: 'POST',
            url,
            json:
            {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": LeadDetails.Phone,
                "type": "template",
                "template":
                {
                    "name": "sales_welcome_message",
                    "language":
                    {
                        "code": "en"
                    },
                    "components": [
                    {
                        "type": "header",
                        "parameters": [
                        {
                            "type": "image",
                            "image":
                            {
                                "link": "https://cdn.shopify.com/s/files/1/0522/6178/1673/files/246014787_23848844542860593_1286890909405393336_n.png"
                            }
                        }]
                    },
                    {
                        "type": "body",
                        "parameters": [
                        {
                            "type": "text",
                            "text": LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                console.log(body);
                res.status(200).send('Success')
            }
        });
    })


    app.post('/sales_follow_up_16_hours', function(req, res)
    {
        res.status(200).send('Success')
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        const options = {
            method: 'POST',
            url,
            json:
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: LeadDetails.Phone,
                type: 'template',
                template:
                {
                    name: 'sales_follow_up_16_hours',
                    language:
                    {
                        code: 'en'
                    },
                    components: [
                    {
                        type: 'body',
                        parameters: [
                        {
                            type: 'text',
                            text: LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error, body);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                res.status(200).send('Success')
                console.log(body);
            }
        });
    })
    app.post('/sales_call_not_connected_with_lead_if_counter__1_7_14_21', function(req, res)
    {
        res.status(200).send('Success')
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        const options = {
            method: 'POST',
            url,
            json:
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: LeadDetails.Phone,
                type: 'template',
                template:
                {
                    name: 'sales_call_not_connected_with_lead_if_counter__1_7_14_21',
                    language:
                    {
                        code: 'en'
                    },
                    components: [
                    {
                        type: 'body',
                        parameters: [
                        {
                            type: 'text',
                            text: LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error, body);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                res.status(200).send('Success')
                console.log(body);
            }
        });
    })
    app.post('/pre_meeting_final_whatsapp_4_days', function(req, res)
    {
        res.status(200).send('Success')
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        const options = {
            method: 'POST',
            url,
            json:
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: LeadDetails.Phone,
                type: 'template',
                template:
                {
                    name: 'pre_meeting_final_whatsapp_4_days',
                    language:
                    {
                        code: 'en'
                    },
                    components: [
                    {
                        type: 'body',
                        parameters: [
                        {
                            type: 'text',
                            text: LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error, body);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                res.status(200).send('Success')
                console.log(body);
            }
        });
    })
    app.post('/sales_30_min_prior_meeting_whatsapp', function(req, res)
    {
        res.status(200).send('Success')
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        const options = {
            method: 'POST',
            url,
            json:
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: LeadDetails.Phone,
                type: 'template',
                template:
                {
                    name: 'sales_30_min_prior_meeting_whatsapp',
                    language:
                    {
                        code: 'en'
                    },
                    components: [
                    {
                        type: 'body',
                        parameters: [
                        {
                            type: 'text',
                            text: LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error, body);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                res.status(200).send('Success')
                console.log(body);
            }
        });
    })
    app.post('/sales_post_meet_proposal_whatsapp', function(req, res)
    {
        res.status(200).send('Success')
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        const options = {
            method: 'POST',
            url,
            json:
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: LeadDetails.Phone,
                type: 'template',
                template:
                {
                    name: 'sales_post_meet_proposal_whatsapp',
                    language:
                    {
                        code: 'en'
                    },
                    components: [
                    {
                        type: 'body',
                        parameters: [
                        {
                            type: 'text',
                            text: LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error, body);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                res.status(200).send('Success')
                console.log(body);
            }
        });
    })
    app.post('/sales_post_meet_follow_up_24_hours', function(req, res)
    {
        res.status(200).send('Success')
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        const options = {
            method: 'POST',
            url,
            json:
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: LeadDetails.Phone,
                type: 'template',
                template:
                {
                    name: 'sales_post_meet_follow_up_24_hours',
                    language:
                    {
                        code: 'en'
                    },
                    components: [
                    {
                        type: 'body',
                        parameters: [
                        {
                            type: 'text',
                            text: LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error, body);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                res.status(200).send('Success')
                console.log(body);
            }
        });
    })
    app.post('/sales_post_meet_call_not_connected_with_client_if_counter__1_7_14_21', function(req, res)
    {
        res.status(200).send('Success')
        var LeadDetails = req.body.Current;
        const request = require('request');
        const url = 'https://graph.facebook.com/v17.0/105752635901921/messages?access_token=EAALGv6rOjD0BAO3ktvSLW7sl4zt20mZCZAoeanUbE2zHn2fLfAICmQJy5BnXV0ia8sXTBWLWpzYNpO1MSVC5Wh08ujzboog1CUhWh1psNXo6x0wjnbQZAvZCfO534fQOEaU76jkZCHAJIMSMFTWFPEPklVc7pIkZCrLc4dmvV9LfubQLAmcB2a';
        const options = {
            method: 'POST',
            url,
            json:
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: LeadDetails.Phone,
                type: 'template',
                template:
                {
                    name: 'sales_post_meet_call_not_connected_with_client_if_counter__1_7_14_21',
                    language:
                    {
                        code: 'en'
                    },
                    components: [
                    {
                        type: 'body',
                        parameters: [
                        {
                            type: 'text',
                            text: LeadDetails.FirstName
                        }]
                    }]
                }
            }
        };
        request(options, function(error, response, body)
        {
            if (error)
            {
                console.error(error, body);
                res.status(500).send('Failure')
            }
            else if (body.error)
            {
                console.error(body.error);
                res.status(500).send('Failure')
            }
            else
            {
                res.status(200).send('Success')
                console.log(body);
            }
        });
    })

    app.post('/hubspot', (req, res) =>
    {
        console.log("Inside Post")
        console.log(req.body); // Log the incoming webhook notification
        res.status(200).send('OK');
    });
    app.get('/hubspot', (req, res) =>
    {
        console.log("Inside GET")
        console.log(req.body); // Log the incoming webhook notification
        res.status(200).send('OK');
    });
    app.get('/contact', function(req, res)
    {
        res.render("contact.html")
    });
    app.get('/privacy-policy', function(req, res)
    {
        res.render("privacy-policy.html")
    });
    app.get('/eligibility-form', function(req, res)
    {
        res.render("eligibility-form.html")
    });
    app.get('/budget', function(req, res)
    {
        res.render("fb-budget-calc.html")
    });
    app.get('/pricing-india', function(req, res)
    {
        res.render("pricing-india.html")
    });
    app.get('/pricing-india-retain', function(req, res)
    {
        res.render("pricing-india-retain.html")
    });
    app.get('/pricing-int', function(req, res)
    {
        res.render("pricing-int.html")
    });
    app.get('/pricing', function(req, res)
    {
        res.render("pricing.html")
    });
    app.get('/pricing-int-retain', function(req, res)
    {
        res.render("pricing-int-retain.html")
    });
    app.get('/bindbrands', function(req, res)
    {
        res.render("bindbrands.html")
    })
    app.get('/form', function(req, res)
    {
        res.render('form.html')
    });
    app.post('/stores', function(req, res)
    {
        console.log("trs");
    })
    app.get('/performance', function(req, res)
    {
        res.render('performancemodel.html')
    })
    app.get('/thankyou', function(req, res)
    {
        res.render("index.html")
    })
    app.get('/team', function(req, res)
    {
        res.render("team.html")
    })
    app.get('/meet', function(req, res)
    {
        res.render("meet.html")
    })
    app.get('/brandconnect', function(req, res)
    {
        res.render('brandconnect.html')
    })
    app.get('/home', function(req, res)
    {
        res.render('index2.html')
    })
    app.get('/website-pricing-page', function(req, res)
    {
        res.render('pricing-model-web-page.html')
    })
    app.get('/our-work', function(req, res)
    {
        res.render('our-work.html')
    })
    app.get('/case-study1', function(req, res)
    {
        res.render('case-study1.html')
    })
    app.get('/case-study-1', function(req, res)
    {
        res.render('case-study1.html')
    })
    app.get('/esme-crystals', function(req, res)
    {
        res.render('esme-case-study.html')
    })
    app.get('/esme-case-study', function(req, res)
    {
        res.render('esme-case-study.html')
    })
    app.get('/udd-studio', function(req, res)
    {
        res.render('udd-case-study.html')
    })
    app.get('/udd-case-study', function(req, res)
    {
        res.render('udd-case-study.html')
    })
    app.get('/harrys', function(req, res)
    {
        res.render('harrys-case-study.html')
    })
    app.get('/harrys-case-study', function(req, res)
    {
        res.render('harrys-case-study.html')
    })
    app.get('/lost-in', function(req, res)
    {
        res.render('lost-in-case-study.html')
    })
    app.get('/lost-in-case-study', function(req, res)
    {
        res.render('lost-in-case-study.html')
    })
    app.get('/kimtrue', function(req, res)
    {
        res.render('kimtrue-case-study.html')
    })
    app.get('/kimtrue-case-study', function(req, res)
    {
        res.render('kimtrue-case-study.html')
    })
    app.get('/leaf', function(req, res)
    {
        res.render('leaf-case-study.html')
    })
    app.get('/leaf-case-study', function(req, res)
    {
        res.render('leaf-case-study.html')
    })
    app.get('/phuljhadi', function(req, res)
    {
        res.render('phuljhadi-case-study.html')
    })
    app.get('/phuljhadi-case-study', function(req, res)
    {
        res.render('phuljhadi-case-study.html')
    })
    app.get('/powersutra', function(req, res)
    {
        res.render('powersutra-case-study.html')
    })
    app.get('/powersutra-case-study', function(req, res)
    {
        res.render('powersutra-case-study.html')
    })
    app.get('/rb-organics', function(req, res)
    {
        res.render('rb-organics-case-study.html')
    })
    app.get('/rb-organics-case-study', function(req, res)
    {
        res.render('rb-organics-case-study.html')
    })
    app.get('/rock-your-baby', function(req, res)
    {
        res.render('rock-your-baby-case-study.html')
    })
    app.get('/rock-your-baby-case-study', function(req, res)
    {
        res.render('rock-your-baby-case-study.html')
    })
    app.get('/theme-my-party', function(req, res)
    {
        res.render('tmp-case-study.html')
    })
    app.get('/theme-my-party-case-study', function(req, res)
    {
        res.render('tmp-case-study.html')
    })
    app.get('/tmp-case-study', function(req, res)
    {
        res.render('tmp-case-study.html')
    })
    app.get('/our-services', function(req, res)
    {
        res.render('our-services.html')
    })
    app.get('/website-development-service', function(req, res)
    {
        res.render('website-development-service.html')
    })
    app.get('/performance-marketing-service', function(req, res)
    {
        res.render('marketing-service.html')
    })
    app.get('/website-development-plans', function(req, res)
    {
        res.render('pricing-model-web-page.html')
    })
    app.get('/performance-marketing-plans', function(req, res)
    {
        res.render('pricing-model-marketing-page.html')
    })
    app.get('/contact-form', function(req, res)
    {
        res.render('contact-form.html')
    })
    app.get('/.well-known/acme-challenge/:id', function(req, res)
    {
        res.send(req.params.id + '.-MJHO9AANppbG1NAsc3HGvv3VS5J3BpEbisQTq2xA6s');
    })
    app.post('/quote', function(req, res)
    {
        console.log(req.body)
        var transporter = nodemailer.createTransport(
        {
            service: "zoho",
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // use SSL
            auth:
            {
                user: 'anuj@messold.com',
                pass: 'muv7FiufVpSG'
            }
        });
        var bb = JSON.stringify(req.body)
        var mailOptions = {
            from: '"Anuj" <anuj@messold.com>', // sender address (who sends)
            to: 'a.anuj1405@gmail.com', // list of receivers (who receives)
            subject: 'New Request Quote', // Subject line
            text: bb, // plaintext body
        }
        transporter.sendMail(mailOptions, function(error, info)
        {
            if (error)
            {
                res.status(200);
                res.send('fail');
                return console.log("error", error);
            }
        });
        res.status(200);
        res.send('success');
    })
    app.get('/stock', function(req, res)
    {
        console.log(req)
    })
    app.get('/connect1', function(req, res)
    {
        res.render('connect.html')
    })
    app.get('/footer', function(req, res)
    {
        res.render('footer.html')
    })
    app.get('/footer2', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'views', 'footer2.html'));
    });
    app.get('/header', function(req, res)
    {
        res.render('header.html')
    })
    app.get('/header2', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'views', 'header2.html'));
    });
    app.get('/refund-cancellation-policy', function(req, res)
    {
        res.render('refund-cancellation-policy.html')
    })
    app.get('/terms-and-conditions', function(req, res)
    {
        res.render('terms-and-conditions.html')
    })
    

    //Partners Page
    app.get('/cashfree', function(req, res) {
        res.redirect('https://merchant.cashfree.com/merchants/signup?referrer=partner&refCode=CFPAJ584871');
    });

    app.get('/Freshsales', function(req, res) {
        res.redirect('https://affiliatepartner-freshmarketer.freshworks.com/7ok36pi5tjjz');
    });

     app.get('/Shiprocket', function(req, res) {
        res.redirect('https://app.shiprocket.in/register?utm_source=Channel_Partner&utm_term=SRCP0232');
    });

      app.get('/payu', function(req, res) {
        res.redirect('https://pmny.in/Jr0JGZJWKJCJ');
    });

      app.get('/razorpay', function(req, res) {
        res.redirect('https://rzp.io/i/GKoXP4lM8l');
    });

     app.get('/Shippo', function(req, res) {
        res.redirect('https://apps.goshippo.com/join?utm_medium=affiliate&utm_source=MESSOLD&code=MESSOLD');
    });

    //Calling UURLSSS
    app.get('/free-consultation-call', function(req, res) {
        res.redirect('https://9pn11j2caq5.typeform.com/to/B40wby7q');
    });
    app.get('/juval', function(req, res) {
        res.redirect('https://calendly.com/meher-messold/intro');
    });
    app.get('/sujatha', function(req, res) {
        res.redirect('https://calendly.com/meher-messold/intro');
    });
    app.get('/madhuri', function(req, res) {
        res.redirect('https://calendly.com/meher-messold/intro');
    });


    app.get('/meher', function(req, res) {
        res.redirect('https://calendly.com/meher-messold/intro');
    });

    app.get('/meera', function(req, res) {
        res.redirect('https://calendly.com/meera-messold/intro');
    });
   

    app.get('/sheetal.t', function(req, res) {
        res.redirect('https://calendly.com/sheetal-sharma/45mins');
    });
    app.get('/anuj', function(req, res) {
        res.redirect('https://calendly.com/anuj_agarwal/45-mins');
    });
    app.get('/poornima.g', function(req, res) {
        res.redirect('https://calendly.com/poornima-kaul-messold/30min');
    });
    app.get('/nidhi.m', function(req, res) {
        res.redirect('https://calendly.com/nidhi-doshi/45mins');
    });
     
    app.get('/harshwardhan', function(req, res) {
        res.redirect('https://calendly.com/harshvardhan-messold/30min');
    });



    app.get('/brand-book', function(req, res) {
        res.redirect('https://drive.google.com/file/d/1pzhCEcoyhrOn8cffufhCRBoTcCiHWmV2/view');
    });
    
   app.get('/careers', function(req, res) {
        res.redirect('https://messold.notion.site/Careers-at-Messold-0a7e0630c94346979ce09c5a22e5c9e0');
    });

    //Sop
      app.get('/shopify-guide', function(req, res) {
        res.redirect('https://messold.notion.site/SHOPIFY-USER-GUIDE-dc804c7efb5746ed9b47aa6ae93fcca7https://messold.notion.site/SHOPIFY-USER-GUIDE-dc804c7efb5746ed9b47aa6ae93fcca7');
    });


    //Pricing Pages
    app.get('/shopify-pricing', function(req, res) {
        res.redirect('https://docs.google.com/spreadsheets/d/e/2PACX-1vTRAXXCV6qxu30TB9l2wBVHKwomm77tHZ_mIroBSND7Z6Dlsyo-ICs2MpC6zz_4c3JpVPKx3HACNDD-/pubhtml?gid=635455103&single=true');
    });

    app.get('/shopify-maintenance', function(req, res) {
        res.redirect('https://docs.google.com/spreadsheets/d/e/2PACX-1vTRAXXCV6qxu30TB9l2wBVHKwomm77tHZ_mIroBSND7Z6Dlsyo-ICs2MpC6zz_4c3JpVPKx3HACNDD-/pubhtml?gid=1027745923&single=true');
    });

   
    app.get('/social-media', function(req, res) {
        res.redirect('https://docs.google.com/spreadsheets/d/e/2PACX-1vTRAXXCV6qxu30TB9l2wBVHKwomm77tHZ_mIroBSND7Z6Dlsyo-ICs2MpC6zz_4c3JpVPKx3HACNDD-/pubhtml?gid=115814487&single=true');
    });

    
    app.get('/marketing-pricing-spend', function(req, res) {
        res.redirect('https://docs.google.com/spreadsheets/d/e/2PACX-1vTRAXXCV6qxu30TB9l2wBVHKwomm77tHZ_mIroBSND7Z6Dlsyo-ICs2MpC6zz_4c3JpVPKx3HACNDD-/pubhtml?gid=278963213&single=true');
    });
    app.get('/marketing-pricing-sales', function(req, res) {
        res.redirect('https://docs.google.com/spreadsheets/d/e/2PACX-1vTRAXXCV6qxu30TB9l2wBVHKwomm77tHZ_mIroBSND7Z6Dlsyo-ICs2MpC6zz_4c3JpVPKx3HACNDD-/pubhtml?gid=534425543&single=true');
    });

    app.get('/shopify-form',function(req,res){
        res.redirect('https://forms.gle/DqxcNsxYGzGWWuk89');

    })


    //Projects Page
    app.get('/projects', function(req, res) {
        res.redirect('https://messold.notion.site/Building-Online-Empires-2d91bc802c98428bbe997323150f05d8');
    });

    app.get('/website', function(req, res) {
        res.redirect('https://messold.notion.site/Crafting-Digital-Frontiers-bb612819d4c3458aa0a44713b17064dc');
    });
    app.get('/marketing', function(req, res) {
        res.redirect('https://messold.notion.site/Digital-Marketing-Mastery-Case-Studies-of-Client-Success-395e7e74421d47f383a4e573c9cb1489');
    });

    //service agreement
    app.get('/website-agreement', function(req, res) {
        res.redirect('https://docs.google.com/document/d/1R0y-erZoek_IKFwEt0Q0amxvC0zrqG9BPa3UjwL0TEc/edit?tab=t.0');
    });

    app.get('/marketing-agreement', function(req, res) {
        res.redirect('https://docs.google.com/document/d/1vMLNbk2dAcHxKCFfetEOFfO3szWoY655jomaMdXIBpE/edit?tab=t.0');
    });


}
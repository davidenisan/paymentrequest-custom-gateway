// import axios from 'axios'

// export default async (req, res) => {
//   console.log(JSON.stringify(req.body))
//   if (req.body && req.body.publicToken) {
//     try {
//       // Validate the request was made by Snipcart
//       await axios.get(`${process.env.PAYMENT_URL}/api/public/custom-payment-gateway/validate?publicToken=${req.body.publicToken}`)

//       // Return the payment methods
//       return res.json([{
//         id: 'sleeky_pay',
//         name: 'SleekyPay',
//         checkoutUrl: `https://sleeky-pay.netlify.app/index.html`,
//       }])
//     }catch(e){
//       // Couldn't validate the request
//       console.error(e)
//       return res.status(401).send()
//     }
//   }

//   // No publicToken provided. This means the request was NOT made by Snipcart
//   return res.status(401).send()
// }
exports.handler = async function(event, context, callback) {   
    // Get request's body
    const request = JSON.parse(event.body)

    // Validate that the request is coming from Snipcart
    const response = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${request.PublicToken}`)

    // Return a 404 if the request is not from Snipcart
    if (!response.ok) return {
        statusCode: 404,
        body: ""
    }

    // Create a payment method list
    let paymentMethodList = [{
        id: '<paystack>',
        name: '<Paystack>',
        checkoutUrl: 'https://sleeky-pay.netlify.app/index.html',
    }]

    // Return successful status code and available payment methods
    return {
        statusCode: 200,
        body: JSON.stringify(paymentMethodList)
    };
}

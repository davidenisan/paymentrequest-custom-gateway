import axios from 'axios'

export default async (req, res) => {
  console.log(JSON.stringify(req.body))
  if (req.body && req.body.publicToken) {
    try {
      // Validate the request was made by Snipcart
      await axios.get(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${request.PublicToken}`)

      // Return the payment methods
      return res.json([{
        id: 'sleeky_pay',
        name: 'SleekyPay',
        checkoutUrl: `https://sleeky-pay.netlify.app/index.html`,
      }])
    }catch(e){
      // Couldn't validate the request
      console.error(e)
      return res.status(401).send()
    }
  }

  // No publicToken provided. This means the request was NOT made by Snipcart
  return res.status(401).send()
}

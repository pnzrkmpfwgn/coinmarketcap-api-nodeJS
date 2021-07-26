const express = require('express');
const dotenv = require("dotenv");
const axios = require('axios');//fetch api can be used as well
const cors  =require('cors')
dotenv.config({ path: "./config/config.env" });//dotenv config needed for env variables to be set 
const app = express();//using express to create servere

//CORS to allow access accross platforms
app.use(cors());

//this configuration needed for more look into coinmarketcap api
const requestOptions = {
  method: "GET",
  qs: {
    start: "1",
    limit: "100",
    convert: "USD",
    symbol: "BTC",
  },
  headers: {
    "X-CMC_PRO_API_KEY": process.env.API_KEY,//api key needed
    Accept: "application/json",
  },

  json: true,
  gzip: true,
};

//controller

getCoin = async (req,res) =>{
  const coin_data = []
  let logoData = [];
  logoData = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",{
      method: "GET",
      params: { id: "1,2,52,74,825,1027,2010,5994,1839" },
      headers: {
        "X-CMC_PRO_API_KEY": "d404905a-22a4-4fc5-9803-234a425c50f4",
      },
    }).then(res => res).then(data => console.log(Object.keys(data).length) )
 await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",requestOptions).then(res =>{
   //console.log(res.data.data.length)
    for(var i = 0 ; i < res.data.data.length;i++){
      if(res.data.data[i].name==="Litecoin"){
        //console.log(res.data.data[i])
      }
      switch(res.data.data[i].id){
        case 1:
         coin_data.push({"name":res.data.data[i].name,"symbol":res.data.data[i].symbol,"price":res.data.data[i].quote.USD.price,"percent_change_24h":res.data.data[i].quote.USD.percent_change_24h});
          break;
        case 52:
          coin_data.push({"name":res.data.data[i].name,"symbol":res.data.data[i].symbol,"price":res.data.data[i].quote.USD.price,"percent_change_24hr":res.data.data[i].quote.USD.percent_change_24h})
          break;
        case 74:
          coin_data.push({"name":res.data.data[i].name,"symbol":res.data.data[i].symbol,"price":res.data.data[i].quote.USD.price,"percent_change_24hr":res.data.data[i].quote.USD.percent_change_24h})
          break;
        case 825:
          coin_data.push({"name":res.data.data[i].name,"symbol":res.data.data[i].symbol,"price":res.data.data[i].quote.USD.price,"percent_change_24hr":res.data.data[i].quote.USD.percent_change_24h})
          break;
        case 1027:
          coin_data.push({"name":res.data.data[i].name,"symbol":res.data.data[i].symbol,"price":res.data.data[i].quote.USD.price,"percent_change_24hr":res.data.data[i].quote.USD.percent_change_24h})
          break;
        case 2010:
          coin_data.push({"name":res.data.data[i].name,"symbol":res.data.data[i].symbol,"price":res.data.data[i].quote.USD.price,"percent_change_24hr":res.data.data[i].quote.USD.percent_change_24h})
          break;
        case 5994:
          coin_data.push({"name":res.data.data[i].name,"symbol":res.data.data[i].symbol,"price":res.data.data[i].quote.USD.price,"percent_change_24hr":res.data.data[i].quote.USD.percent_change_24h})
          break;
        case 1839:
          coin_data.push({"name":res.data.data[i].name,"symbol":res.data.data[i].symbol,"price":res.data.data[i].quote.USD.price,"percent_change_24hr":res.data.data[i].quote.USD.percent_change_24h})
        default:
          break;
      }
    }
}).catch(err => console.log(message.err))
    res.status(200).json({
        succes:true,
        data:coin_data
    })
}

//mounting api
app.use('/getcoin',
  getCoin
);

app.listen(
  process.env.PORT,
  console.log(`Server is running at ${process.env.PORT}`
  )
)

module.exports = function orders(axios){
    const baseUrl = "v2/checkout/orders";

    return{
        create: async (intent, purchaseUnits, extras) => {
            try{
                const payload = {intent, purchase_units: purchaseUnits, ...extras};
                return (await axios.post(baseUrl, payload)).data;
            }catch(err){
                throw err;
            }
        },
        update: async (orderId, patchRequest) => {
            try{
                await axios.patch(`${baseUrl}/${orderId}`, patchRequest);
            }catch(err){
                throw err;
            }
        },
        details: async (orderId) => {
            try{
                return (await axios.get(`${baseUrl}/${orderId}`)).data;
            }catch(err){
                throw err;
            }
        },
        authorize: async (orderId, extras) => {
            try{
                const payload = {...extras};
                return (await axios.post(`${baseUrl}/${orderId}/authorize`, payload)).data;
            }catch(err){
                throw err;
            }
        },
        capture: async (orderId, extras) => {
            try{
                const payload = {...extras};
                return (await axios.post(`${baseUrl}/${orderId}/capture`, payload)).data;
            }catch(err){
                throw err;
            }
        }
    }
};
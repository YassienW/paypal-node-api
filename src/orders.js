
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
                return (await axios.patch(`${baseUrl}/${orderId}`, patchRequest)).data;
            }catch(err){
                throw err;
            }
        },
        details: async (orderId) => {
            try{
                await axios.get(`${baseUrl}/${orderId}`);
            }catch(err){
                throw err;
            }
        },
        authorize: async (subscriptionId, extras) => {
            try{
                const payload = {...extras};
                await axios.post(`${baseUrl}/${subscriptionId}/cancel/authorize`, payload);
            }catch(err){
                throw err;
            }
        },
        capture: async (subscriptionId, extras) => {
            try{
                const payload = {...extras};
                await axios.post(`${baseUrl}/${subscriptionId}/cancel/capture`, payload);
            }catch(err){
                throw err;
            }
        }
    }
};
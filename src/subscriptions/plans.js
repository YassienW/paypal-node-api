module.exports = function plans(axios){
    const baseUrl = "v1/billing/plans";

    return{
        create: async (productId, planName, billingCycles, extras) => {
            try{
                const payload = {...extras, product_id: productId, name: planName, billing_cycles: billingCycles};
                return (await axios.post(baseUrl, payload)).data;
            }catch(err){
                throw err;
            }
        },
        list: async () => {
            try{
                return (await axios.get(baseUrl)).data;
            }catch(err){
                throw err;
            }
        },
        update: async (planId, patchRequest) => {
            try{
                return (await axios.patch(`${baseUrl}/${planId}`, patchRequest)).data;
            }catch(err){
                throw err;
            }
        },
        details: async (planId) => {

        },
        activate: async () => {

        },
        deactivate: async () => {

        }
    }
};
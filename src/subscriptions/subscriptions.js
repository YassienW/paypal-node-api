const plans = require("./plans");

module.exports = function subscriptions(axios){
    const baseUrl = "v1/billing/subscriptions";

    return{
        plans: plans(axios),
        create: async (planId, extras) => {
            try{
                const payload = {...extras, plan_id: planId};
                return (await axios.post(baseUrl, payload)).data;
            }catch(err){
                throw err;
            }
        },
        details: async (subscriptionId) => {
            try{
                return (await axios.get(`${baseUrl}/${subscriptionId}`)).data;
            }catch(err){
                throw err;
            }
        },
        cancel: async (subscriptionId, reason) => {
            try{
                const payload = {reason};
                await axios.post(`${baseUrl}/${subscriptionId}/cancel`, payload);
            }catch(err){
                throw err;
            }
        }
    }
};
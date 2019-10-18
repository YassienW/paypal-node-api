module.exports = function webhooks(axios){
    const baseUrl = "v1/notifications";

    return{
        verify: async (authAlgo, certUrl, transmissionId, transmissionSig, transmissionTime, webhookId, webhookEvent) => {
            try{
                const payload = {auth_algo: authAlgo, cert_url: certUrl, transmission_id: transmissionId,
                    transmission_sig: transmissionSig, transmission_time: transmissionTime, webhook_id: webhookId,
                    webhook_event: webhookEvent};
                const response = (await axios.post(`${baseUrl}/verify-webhook-signature`, payload)).data;
                return response.verification_status === "SUCCESS";
            }catch(err){
                throw err;
            }
        }
    }
};
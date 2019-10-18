const PaypalClient = require("./src/PaypalClient");

const clientId = "AXEY-VMSr3YCfAUYRKQa0cz49v7wBPl-rVwIzVbA1sk7FzhfqDUdrmXNrGqaF-rKA_AAiY3S3gwMGDV_";
const secret = "ECcwftnYUfS1RV3hOLccPDMS1yVmzZILGorVm8h7jIOXLolY2hbxtdPcPWc5zsIB9iJ_oeD22qU4-mTd";

const paypal = new PaypalClient("sandbox", clientId, secret);

paypal.on("auth", async () => {
    console.log("Auth");
    try{
        //console.log(await paypal.subscriptions.plans.list());
    }catch(err){
        console.log(err)
    }
});

(async () => {
    try{
        //console.log(await paypal.subscriptions.plans.list());
    }catch(err){
        console.log(err)
    }
})();

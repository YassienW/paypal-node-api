const EventEmitter = require("events"),
    axios = require("axios"),
    subscriptions = require("./subscriptions/subscriptions"),
    webhooks = require("./webhooks");

module.exports = class PaypalClient extends EventEmitter{
    constructor(env, clientId, secret, config){
        super();

        this.config = config;

        //create the common axios instance used for all future requests
        this.axios = axios.create();

        this.axios.interceptors.request.use(async (config) => {
            //if the token expired fetch a new one first before calling the request
            if(Date.now() >= this.tokenExpiry - 500){
                await this.auth();
            }
            return config;
        });

        //we don't need the full error, strip it down
        this.axios.interceptors.response.use(null, (err) => {
            const response = err.response;
            delete response.config;
            delete response.request;
            delete response.headers;
            return Promise.reject(response);
        });
        this.configure(env, clientId, secret);

        this.subscriptions = subscriptions(this.axios);
        this.webhooks = webhooks(this.axios);
    }
    async auth(){
        const response = (await axios.post(`${this.baseUrl}/v1/oauth2/token`, "grant_type=client_credentials",
            {auth: {username: this.clientId, password: this.secret}})).data;
        this.axios.defaults.headers.common.Authorization = `Bearer ${response.access_token}`;

        //the future timestamp at which the token will expire
        this.tokenExpiry = Date.now() + (response.expires_in * 1000);

        this.emit("auth");

        //setTimeout(() => this.auth(), response.expires_in * 1000);
    }
    configure(env, clientId, secret){
        if(!clientId){
            throw new Error("Client ID can't be empty");
        }
        if(!secret){
            throw new Error("Secret can't be empty");
        }

        this.clientId = clientId;
        this.secret = secret;

        if(env === "sandbox"){
            this.baseUrl = "https://api.sandbox.paypal.com";
        }else if(env === "live"){
            this.baseUrl = "https://api.paypal.com";
        }else{
            throw new Error("Invalid Paypal Environment");
        }

        this.axios.defaults.baseURL = this.baseUrl;
        this.auth();
    }
};
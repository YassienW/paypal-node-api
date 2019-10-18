# Paypal Node API

A wrapper around paypal's REST API, featuring events, promise support and auto auth.

Only supports subscriptions for now, others will be added per request.

**THIS IS NOT AN OFFICIAL API**

<!--![npm](https://img.shields.io/npm/v/kik-node-api.svg?style=plastic)
![npm](https://img.shields.io/npm/dt/kik-node-api.svg?style=plastic)-->

## Installation

NPM:

```bash
npm i kik-paypal-api
```

## Usage

* [Getting started](#getting-started)
* [The error object](#error-object)

##### Requests

1. [The Basics](#basics)
    * [The Extras Object](#the-extras-object)
2. [Subscriptions](#subscriptions)
    * [Create](#create)
    * [Details](#details)
3. [Plans](#plans)
    * [Create](#create)
    * [List](#list)
    * [Update](#update)
3. [Webhooks](#webhooks)
    * [Verify](#verify)
    
<!--
##### Events

1. [The Basics](#the-basics)
    * [Authenticated](#authenticated)
-->

---

### Getting Started

You can use the API by creating an instance of `PaypalClient`.

```javascript
const PaypalClient = require("paypal-node-api");

paypal = new PaypalClient({
    env: "sandbox",
    clientId: "id",
    secret: "secret",
    config: {}
});

```
`env`: one of either "sandbox" or "live"

`clientId`: your app's client id

`secret`: your app's secret

`config`: a config object

##### Sharing a paypal instance:

```javascript
const PaypalClient = require("paypal-node-api");

const clientId = "yourApp'sId";
const secret = "yourApp'sSecret";

const paypal = new PaypalClient("sandbox", clientId, secret);

//event handlers go here
paypal.on("auth", () => {
    console.log("Paypal token refreshed");
});

module.exports = paypal;
```                                                                                                                                      

### Getting Started
#### The Extras Object

All required parameters are supplied directly to the functions,
non required parameters can be supplied via the `extras` parameter, this
object is merged into the request's payload

### Requests
#### Subscriptions
##### Create

```javascript
await paypal.subscriptions.create(planId, extras);
```

`planId`: the plan associated with this subscription

##### Details

```javascript
await paypal.subscriptions.details(subscriptionId);
```

`subscriptionId`: the subscription id to retrieve

returns the subscription object

#### Webhooks
##### Verify

```javascript
await paypal.webhooks.verify(authAlgo, certUrl, transmissionId, transmissionSig, transmissionTime, webhookId, webhookEvent)
```

returns true if verified, false if not

<!--
### Events
#### The Basics

`KikClient` uses Node's [Event Emitter](https://nodejs.org/api/events.html) class
to handle events, all events are attached in the following way:

```javascript
Kik.on(eventname, (param1, param2) => {
    //do stuff with params here
})
```

Below are the details of all events emitted by the `KikClient` class

##### Authenticated

```javascript
Kik.on("authenticated", () => {
    console.log("Authenticated")
})
```-->

## License
[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)

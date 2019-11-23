# Paypal Node API

A wrapper around paypal's REST API, featuring events, promise support and auto auth.

Only supports subscriptions for now, others will be added per request.

**THIS IS NOT AN OFFICIAL API**

![npm](https://img.shields.io/npm/dt/paypal-node-api?style=plastic)

## Installation

NPM:

```bash
npm i kik-paypal-api
```

## Usage

* [Getting started](#getting-started)

##### Requests

1. [The Basics](#the-basics)
    * [The Extras Object](#the-extras-object)
    * [The Error Object](#the-error-object)
2. [Orders](#orders)
    * [Create](#orders-create)
    * [Update](#orders-update)
    * [Details](#orders-details)
    * [Authorize](#authorize)
    * [Capture](#capture)
3. [Subscriptions](#subscriptions)
    * [Create](#subs-create)
    * [Details](#subs-details)
4. [Plans](#plans)
    * [Create](#plans-create)
    * [List](#list)
    * [Update](#plans-update)
5. [Webhooks](#webhooks)
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

### The Basics
#### The Extras Object

All required parameters are supplied directly to the functions,
non required parameters can be supplied via the `extras` parameter, this
object is merged into the request's payload

#### The Error Object

### Requests
#### Orders
##### <a name="orders-create"></a>Create

```javascript
await paypal.orders.create(intent, purchaseUnits);
```

`intent`: either "CAPTURE" or "AUTHORIZE"

`purchaseUnits`: an array of [purchase_unit_request](https://developer.paypal.com/docs/api/orders/v2/#definition-purchase_unit_request) objects

##### <a name="orders-update"></a>Update

```javascript
await paypal.orders.update(orderId, patchRequest);
```

`orderId`: the target order's id

`patchRequest`: an array of [patch](https://developer.paypal.com/docs/api/orders/v2/#definition-patch) objects

##### <a name="orders-details"></a>Details

```javascript
await paypal.orders.details(orderId);
```

`orderId`: the target order's id

##### Authorize

```javascript
await paypal.orders.authorize(planId);
```

`orderId`: the target order's id

##### Capture

```javascript
await paypal.orders.capture(orderId);
```

`orderId`: the target order's id

#### Subscriptions
##### <a name="subs-create"></a>Create

```javascript
await paypal.subscriptions.create(planId, extras);
```

`planId`: the plan associated with this subscription

##### <a name="subs-details"></a>Details

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

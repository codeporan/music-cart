import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      this.props.onSuccess(payment);
      console.log(JSON.stringify(payment));

      //   {"paid":true,"cancelled":false,
      //   "payerID":"7837A3ZZWS7TS",
      //   "paymentID":"PAYID-LRK7ACQ7RP24301JM040370P",
      //   "paymentToken":"EC-56F62261K17932013",
      //   "returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LRK7ACQ7RP24301JM040370P&token=EC-56F62261K17932013&PayerID=7837A3ZZWS7TS",
      //   "address":{"recipient_name":"test buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},
      //   "email":"shahaparan2014-buyer@gmail.com"}
    };
    const onCancle = data => {
      console.log(JSON.stringify(data));
    };
    const onError = err => {
      console.log(JSON.stringify(err));
    };
    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;
    const client = {
      sandbox:
        "AT1F5v-faXrjRiuo2Y7nCkksA9mkOmr3IaA233bBc3Gw2qv91K5vvCB7eI7Tk_-EHRFsNTqsPhMc2hUl",
      production: ""
    };
    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          onError={onError}
          onSuccess={onSuccess}
          onCancle={onCancle}
          total={total}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout"
          }}
        />
      </div>
    );
  }
}
export default Paypal;

import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import UserProductBlock from "./UserProductBlock";
import { connect } from "react-redux";
import {
  getCartItems,
  removeCartItems,
  onSuccessBuy
} from "../../actions/authactions";
import Paypal from "./paypal";
class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };
  componentDidMount() {
    let cartItem = [];
    let user = this.props.user;
    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => cartItem.push(item.id));
      }
    }
    this.props.dispatch(getCartItems(cartItem, user.userData.cart)).then(() => {
      if (this.props.user.cartDetail.length > 0) {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  }

  calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    this.setState({
      total,
      showTotal: true
    });
  };
  removeFromCart = id => {
    console.log(id);
    this.props.dispatch(removeCartItems(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };
  ShowNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  );
  transactionError = data => {
    console.log("transactionCancle");
  };
  transactionCancle = () => {
    console.log("transactionCancle");
  };
  transactionSuccess = payment => {
    this.props
      .dispatch(
        onSuccessBuy({
          cartDetail: this.props.user.cartDetail,
          paymentData: payment
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          });
        }
      });
  };
  render() {
    console.log(this.props.user.cartDetail);
    return (
      <div className="container">
        <div className="col-md-8">
          <h1>My cart</h1>
          <div className="user_cart">
            <UserProductBlock
              products={this.props.user}
              type="cart"
              removeItem={id => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  <div>Total Amount ${this.state.total}</div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              <div className="cart_success">
                <FontAwesomeIcon icon={faSmile} />
                <div>THANK YOU</div>
                <div>YOUR ORDER IS NOW COMPLETE</div>
              </div>
            ) : (
              this.ShowNoItemMessage()
            )}
            {this.state.showTotal ? (
              <div className="paypal_button_container">
                <Paypal
                  toPay={this.state.total}
                  onSuccess={data => this.transactionSuccess(data)}
                  transactionCancle={data => this.transactionCancle(data)}
                  transactionError={data => this.transactionError(data)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user
});

export default connect(mapState)(Cart);

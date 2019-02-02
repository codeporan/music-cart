import React, { Component } from "react";
import Card from "../common/card";

class CardBlock extends Component {
  render() {
    const { list, title } = this.props;

    return (
      <div>
        <div className="card_block">
          <div className="container">
            <div className="title">{title}</div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap"
              }}
            >
              {list &&
                list.map(item => (
                  // <div key={item._id}>
                  <Card key={item._id} {...item} />
                  // </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardBlock;

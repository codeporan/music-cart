import React from "react";
import moment from "moment";

// {moment(product.dateOfPurchase).format("MM-DD-YYYY")}

const UserHistoryBlock = ({ products }) => {
  const renderBlocks = () =>
    products
      ? products.map((product, i) => (
          <tr key={i}>
            <td>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
            {/* <td>{product.porder}</td> */}
            <td>
              {product.name
                .split("")
                .slice(0, 10)
                .join("")}
            </td>
            <td>
              {product.brand
                .split("")
                .slice(0, 5)
                .join("")}
            </td>
            <td>$ {product.price}</td>
            <td>{product.quantity}</td>
          </tr>
        ))
      : null;

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            {/* <th>Order number</th> */}
            <th>Product</th>
            <th>brand</th>
            <th>paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default UserHistoryBlock;

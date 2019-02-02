import React from "react";
import { Link } from "react-router-dom";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faShoppingBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";

const Mybutton = ({ type, title, link, style, altClass, runAction }) => {
  const buttons = () => {
    let template = "";
    switch (type) {
      case "default":
        template = (
          <Link
            className={!altClass ? "link_default" : altClass}
            to={link}
            {...style}
          >
            {title}
          </Link>
        );
        break;
      case "bag_link":
        template = (
          <div className="bag_link" onClick={() => runAction()}>
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
        );
        break;
      default:
        template = "";
    }
    return template;
  };
  return <div className="my_link">{buttons()}</div>;
};
export default Mybutton;

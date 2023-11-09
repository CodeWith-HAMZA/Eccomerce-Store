import React, { Fragment, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Order from "../../Components/Order";
import { getSingleDocumentById } from "../../firebase/firebaseMethods";

const OrderDetails = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const nav = useNavigate();
  const [MyOrder, setMyOrder] = React.useState({});

  useEffect(() => {
    // * Passing Data Through useNavigate To This Component
    if (!location?.state?.order) {
      nav("/forbidden");
    }
  }, []);
  return location?.state?.order ? (
    <Fragment>
      <Order orderId={orderId} order={location?.state?.order} />
    </Fragment>
  ) : (
    "Order Not Found (Forbidden) - 403"
  );
};

export default OrderDetails;

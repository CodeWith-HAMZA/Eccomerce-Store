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
  return (
    <Fragment>
      <Order orderId={orderId} order={location?.state?.order} />
    </Fragment>
  );
};

export default OrderDetails;

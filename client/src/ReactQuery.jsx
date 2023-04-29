import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useReducer } from "react";
import { getMultipleDocs } from "./firebase/firebaseMethods";

const ReactQuery = () => {
  const [Data, setData] = React.useState([]);
  const [state, dispatch] = useReducer((state, action) => {
    if (action.type === "EMAIL") {
      return { ...state, [action.payload.name]: action.payload.value };
    }
    if (action.type === "PASSWORD") {
      return { ...state, [action.payload.name]: action.payload.value };
    }
    if (action.type === "NAME") {
      console.log(action.payload);
      return { name: action.payload, ...state };
    }
  }, {});
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const orders = await getMultipleDocs("orders");
      return orders;
    },
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.error) {
    return <div>Error: {query.error.message}</div>;
  }
  return (
    <div className="pt-36">
      {query?.data?.map((p) => (
        <div onClick={() => {}}>{p?.email}</div>
      ))}

      <div>
        {Object.keys(state).map((key) => (
          <div key={key}>
            {key}:{state[key]}
          </div>
        ))}
      </div>
      {/* <button onClick={() => dispatch({ type: "INCREAMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREAMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "MYCHOICE", payload: 4 })}>WAH</button> */}
      <input
        name="name"
        onChange={(e) => dispatch({ type: "UPDATEFORM", payload: e.target })}
        value={state.name}
      />
      <input
        name="password"
        value={state.password}
        onChange={(e) => dispatch({ type: "UPDATEFORM", payload: e.target })}
      />
    </div>
  );
};

export default ReactQuery;

// use tanstack react query to fetch data from api

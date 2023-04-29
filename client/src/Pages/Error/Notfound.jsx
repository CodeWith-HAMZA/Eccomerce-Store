import React from "react";
import ErrorPage from "./ErrorPage";

const Notfound = ({}) => {
  return (
    <ErrorPage>
      <h1 class="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
        404 - Page not found
      </h1>
      <p class="text-slate-600 mt-5 lg:text-lg">
        The page you are looking for doesn't exist or <br />
        has been removed.
      </p>
    </ErrorPage>
  );
};

 export default Notfound;

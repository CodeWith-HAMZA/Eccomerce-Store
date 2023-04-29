import React from "react";
import ErrorPage from "./ErrorPage";

const Forbidden = ({}) => {
  return (
    <ErrorPage>
      <h1 class="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
       (403) Access Denied: This is Not the Page You're Looking For
      </h1>
      <p class="text-slate-600 mt-5 lg:text-lg">
        403 Error: Sorry, it seems you don't have the necessary clearance to
        access this page. Have you tried using a Jedi mind trick? It might work
        better than hacking.
      </p>
    </ErrorPage>
  );
};

export default Forbidden;

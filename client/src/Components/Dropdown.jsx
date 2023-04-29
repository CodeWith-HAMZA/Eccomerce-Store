import React from "react";
import { Link } from "react-router-dom";
import '../dropdown.css'
const Dropdown = ({ list, dropdownName }) => {
  return (
    <div class="">
      <div class="dropdown inline-block relative  ">
        <button class=" bg-gray-100 hover:bg-gray-200 text-gray-700 font-normal py-2 px-4 rounded inline-flex items-center transition-all">
          <span class="mr-1">{dropdownName}</span>
        </button>
        <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
          {list &&
            list.map(({ url, name }) => (
              <li  >
                <Link
                  class="transition-all rounded-t bg-gray-100 hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
                  to={url}
                >
                  {name}
                </Link>
              </li>
            ))}
            
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;

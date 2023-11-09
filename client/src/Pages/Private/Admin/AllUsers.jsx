import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { getMultipleDocs } from "../../../firebase/firebaseMethods";
const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getMultipleDocs("users");
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-8 py-12 ">
      <h2 className="text-2xl font-semibold mb-4">All Members</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <TableHead />

        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{idx + 1}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(user.timestamp.seconds * 1000).toLocaleString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function TableHead(props) {
  return (
    <thead>
      <tr>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          S/no
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          ID
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Email
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Joined
        </th>
      </tr>
    </thead>
  );
}
export default AllUsers;

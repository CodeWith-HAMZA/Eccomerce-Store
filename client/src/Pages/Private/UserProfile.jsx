import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { top20CitiesInPakistan } from "../../constants/citiesOfPak";
import { showToast } from "../../constants/toastNotification";
import Context from "../../Context/Context";
import {
  findByFieldAndUpdateDoc,
  findByIdAndUpdateDoc,
  getMultipleDocs,
} from "../../firebase/firebaseMethods";
const UserProfile = () => {
  const { User, setUser, ProfileData, setProfileData } = useContext(Context);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   (async () => {
  //     const docs = await getMultipleDocs("users");
  //     for (let doc of docs) {
  //       if (doc.uid === User.uid) {
  //         setProfileData({
  //           name: doc.name,
  //           email: doc.email,
  //           location: doc.location,
  //           role: doc.admin,
  //         });
  //       }
  //     }
  //   })();
  //   // findByIdAndUpdateDoc("users", "4MyKAUzkmeoAHXRFrwDj", {adminu: true})
  // }, []);
  React.useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <section className="h-screen pt-28">
      <div class="min-h-screen bg-gray-100">
        <div class="py-6 sm:py-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center sm:justify-between">
              <div class="sm:flex sm:space-x-5">
                <div class="flex-shrink-0">
                  <img
                    class="h-24 w-24 rounded-full"
                    src={User.photoURL}
                    alt="Profile picture"
                  />
                </div>
                <div class="mt-4 sm:mt-0">
                  <h1 class="text-3xl font-bold text-gray-900">
                    {ProfileData.name}
                  </h1>
                  <p class="text-sm font-medium text-gray-500">
                    {ProfileData.email}
                    {ProfileData?.role && (
                      <span className="bg-gray-200 border-2 border-gray-300 m-1 px-1 py-0.5 rounded-md">
                        Admin (Special User)
                      </span>
                    )}
                  </p>
                  <p class="text-sm font-medium text-gray-500">
                    {ProfileData.location}, Pakistan
                  </p>
                </div>
              </div>
              <div class="mt-5 flex justify-center sm:mt-0">
                <button
                  onClick={async () => {
                    findByFieldAndUpdateDoc(
                      "users",
                      { uid: User.uid },
                      { ...ProfileData }
                    );
                    await showToast("success", "Successfully Saved Changes");
                  }}
                  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-all hover:shadow-md shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h2 class="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h2>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Basic info, like your name and email address.
            </p>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Full name</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={ProfileData.name}
                  />
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span>{ProfileData.email}</span>
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Location</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select
                    name="location"
                    value={ProfileData.location}
                    onChange={handleChange}
                  >
                    {/* <option value="">--Please select an option--</option> */}
                    {top20CitiesInPakistan.map((city, index) => {
                      return <option value={city}>{city}</option>;
                    })}
                  </select>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
export default UserProfile;

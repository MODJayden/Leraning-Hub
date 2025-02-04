import { useToast } from "@/assets/hooks/use-toast";
import { changePassword } from "@/store/user-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const {toast}=useToast()

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = {
      currentPassword,
      newPassword,
      confirmPassword,
    };
    console.log(form);

    dispatch(changePassword({ form:form, id: user.id })).then((res) => {
      if(res?.payload.success){
        toast({
          title:"Success",
          description:res?.payload.message
        })
      }else{
        toast({
          title:"Failed",
          description:res?.payload.message
        })
      }
  })};

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Change Password
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Current Password */}
            <div className="mb-6">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a435f0] focus:border-[#a435f0]"
                placeholder="Enter current password"
              />
            </div>

            {/* New Password */}
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a435f0] focus:border-[#a435f0]"
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a435f0] focus:border-[#a435f0]"
                placeholder="Confirm new password"
              />
            </div>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#a435f0] text-white px-6 py-2 rounded-lg hover:bg-[#4a1fb8] focus:outline-none focus:ring-2 focus:ring-[#a435f0]"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage

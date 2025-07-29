import React, { useEffect } from 'react';
import { useAuth } from './Appcontext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">User Profile</h1>
      
      <div className="space-y-6">
        <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</label>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.name}</p>
        </div>
        
        <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.email}</p>
        </div>
        
        <div className="pb-4">
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Account Created</label>
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => toast.info('Feature coming soon!')}
          className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Edit Profile
        </button>
        <button
          onClick={() => toast.info('Feature coming soon!')}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
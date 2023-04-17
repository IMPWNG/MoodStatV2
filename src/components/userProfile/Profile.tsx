/* eslint-disable no-console */
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { useEffect, useRef, useState } from 'react';

import { useUsers } from '@/hooks/useUserData';

const Profile = () => {
  const [showUserCard, setShowUserCard] = useState(false);
  const { usersModel } = useUsers();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const supabaseClient = useSupabaseClient<any>();
  const toggleUserCard = () => {
    setShowUserCard(!showUserCard);
  };

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowUserCard(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.log('Error logging out:', error.message);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const users = useUser();

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        className="focus:outline-none"
        onClick={toggleUserCard}
        aria-label="User profile"
      >
        <img
          src={users?.user_metadata.avatar_url}
          alt="User avatar"
          className="h-10 w-10 rounded-full"
        />
      </button>

      {showUserCard && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg bg-red-100 p-6 shadow-md">
          {usersModel.map((user) => (
            <div key={user.id} className="mb-4 border-b border-gray-200 pb-4">
              <div className="mb-4 flex items-center">
                <img
                  src={users?.user_metadata.avatar_url}
                  alt="User avatar"
                  className="mr-4 h-16 w-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Hello {user.name} 👋
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <p>
                  <span className="font-semibold">👤 Age:</span> {user.age}
                </p>
                <p>
                  <span className="font-semibold">⚤ Gender:</span> {user.gender}
                </p>
                <p>
                  <span className="font-semibold">
                    💭 Negative Thoughts Frequency:
                  </span>{' '}
                  {user.negativeThoughtsFrequency}
                </p>
                <p>
                  <span className="font-semibold">
                    😥 Emotion Management Difficulty:
                  </span>{' '}
                  {user.emotionManagementDifficulty ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-semibold">😓 Stress Frequency:</span>{' '}
                  {user.stressFrequency}
                </p>
                <p>
                  <span className="font-semibold">💤 Sleep Problems:</span>{' '}
                  {user.sleepProblems ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-semibold">
                    🔄 Life Change Experience:
                  </span>{' '}
                  {user.lifeChangeExperience}
                </p>
                <p>
                  <span className="font-semibold">
                    🏥 Diagnosed with Mental Illness:
                  </span>{' '}
                  {user.diagnosedWithMentalIllness ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-semibold">
                    🤝 Support System Availability:
                  </span>{' '}
                  {user.supportSystemAvailability ? 'Yes' : 'No'}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold">🎉 Helpful Activities:</span>{' '}
                  {user.helpfulActivities}
                </p>
              </div>
            </div>
          ))}
          <button
            className="w-full rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export { Profile };

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React from 'react';

import { useUsers } from '@/hooks/useUserData';

const Profile = () => {
  const { usersModel } = useUsers();

  const supabaseClient = useSupabaseClient<any>();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.log('Error logging out:', error.message);
  };

  const users = useUser();

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="candice wu"
          className="cursor-pointer"
          src={users?.user_metadata.avatar_url}
        />
      </MenuHandler>
      <MenuList>
        {usersModel?.map((user, index) => (
          <div key={index}>
            <Typography variant="h6" className="text-center font-bold">
              Hello {user.name} 👋
            </Typography>
            <MenuItem className="mt-4 flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                👤 Age: {user.age}
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                ⚤ Gender: {user.gender}
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                💭 Ntf: {user.negativeThoughtsFrequency}
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                😥 Emd: {user.emotionManagementDifficulty ? 'Yes' : 'No'}
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                😓 Sf: {user.stressFrequency}
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                💤 Sp: {user.sleepProblems ? 'Yes' : 'No'}
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                🔄 Lce: {user.lifeChangeExperience}
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                🏥 Dmi: {user.diagnosedWithMentalIllness ? 'Yes' : 'No'}
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                🤝 Ssa: {user.supportSystemAvailability ? 'Yes' : 'No'}
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Typography variant="small" className="font-normal">
                🎉 Ha {user.helpfulActivities}
              </Typography>
            </MenuItem>

            <hr className="my-2 border-blue-gray-50" />
            <MenuItem
              className="flex items-center justify-center gap-2 text-center"
              onClick={handleLogout}
            >
              <Typography
                variant="small"
                className="text-center font-normal text-red-600"
              >
                Logout
              </Typography>
            </MenuItem>
          </div>
        ))}
      </MenuList>
    </Menu>
  );
};

export { Profile };

import type { NextComponentType, NextPageContext } from 'next';
import { createContext, useContext } from 'react';

import type { MoodsData } from '@/hooks/useMoods'; // Update the import path if necessary
import { useMoods } from '@/hooks/useMoods';

interface MoodsProviderProps {
  children: React.ReactNode;
}

const MoodsContext = createContext<MoodsData | undefined>(undefined);

const MoodsProvider: NextComponentType<
  NextPageContext,
  {},
  MoodsProviderProps
> = ({ children }) => {
  const moodsData = useMoods();

  return (
    <MoodsContext.Provider value={moodsData}>{children}</MoodsContext.Provider>
  );
};

export const useMoodsContext = (): MoodsData => {
  const context = useContext(MoodsContext);
  if (context === undefined) {
    throw new Error('useMoodsContext must be used within a MoodsProvider');
  }
  return context;
};

export { MoodsProvider };

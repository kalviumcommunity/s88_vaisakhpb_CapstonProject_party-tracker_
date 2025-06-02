import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FigmaDesign } from '../types';

interface DesignContextType {
  design: FigmaDesign;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

interface DesignProviderProps {
  children: ReactNode;
}

export const DesignProvider: React.FC<DesignProviderProps> = ({ children }) => {
  const [design] = useState<FigmaDesign>({
    id: 'party-tracker-2025',
    name: 'Party Tracker - Modern Event Discovery Platform',
    url: 'https://www.figma.com/file/party-tracker-design-2025',
    lastModified: '2025-03-15',
    owner: 'StackBlitz Design Team',
    team: 'Party Tracker'
  });

  return (
    <DesignContext.Provider value={{ design }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = (): DesignContextType => {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};
import React, { ReactNode } from 'react'; 
import { SpaceProvider } from './SpaceProvider';
import { UserPositionProvider } from './UserPositionProvider';

interface MainProviderProps {
    children: ReactNode;
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
    return (
        <SpaceProvider>
            <UserPositionProvider>
                {children}
            </UserPositionProvider>
        </SpaceProvider>
    );
};

export default MainProvider;
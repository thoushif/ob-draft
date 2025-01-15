import React, { createContext, useState, ReactNode } from 'react';

interface UserPosition {
    x: number;
    y: number;
}

interface UserPositionContextProps {
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    position: UserPosition;
    setPosition: React.Dispatch<React.SetStateAction<UserPosition>>;
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
}
//create an initial context
export const initialUserPosition = {
    status: '',
    position: { x: 10, y: 10 },
    role: '',
}
 
const UserPositionProvider = ({ children }: { children: ReactNode }) => {
    const [status, setStatus] = useState<string>(initialUserPosition.status);
    const [position, setPosition] = useState<UserPosition>({ x: initialUserPosition.position.x, y: initialUserPosition.position.y });
    const [role, setRole] = useState<string>(initialUserPosition.role);

    return (
        <UserPositionContext.Provider value={{ status, setStatus, position, setPosition, role, setRole }}>
            {children}
        </UserPositionContext.Provider>
    );
};

  

const UserPositionContext = createContext<UserPositionContextProps | undefined>(undefined);

 

export { UserPositionContext, UserPositionProvider };
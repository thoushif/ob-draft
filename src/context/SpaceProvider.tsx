import React, { createContext, useState, ReactNode } from 'react'; 

interface SpaceContextProps {
    name:string;
    isActive: boolean;
    size: number;
    level: number;
    capacity: number;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    setLevel: React.Dispatch<React.SetStateAction<number>>;
    setCapacity: React.Dispatch<React.SetStateAction<number>>;
}

const defaultValues: SpaceContextProps = {
    name: 'Space',
    isActive: false,
    size: 30,
    level: 1,
    capacity: 10,
    setName: () => {},
    setIsActive: () => {},
    setSize: () => {},
    setLevel: () => {},
    setCapacity: () => {},
};

export const SpaceContext = createContext<SpaceContextProps>(defaultValues);

export const SpaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [name, setName] = useState(defaultValues.name);
    const [isActive, setIsActive] = useState(defaultValues.isActive);
    const [size, setSize] = useState(defaultValues.size);
    const [level, setLevel] = useState(defaultValues.level);
    const [capacity, setCapacity] = useState(defaultValues.capacity);

    return (
        <SpaceContext.Provider value={{ name, isActive, size, level, capacity, setName, setIsActive, setSize, setLevel, setCapacity }}>
            {children}
        </SpaceContext.Provider>
    );
}; 
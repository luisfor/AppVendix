'use client';

import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
    userImage: string | null;
    setUserImage: (url: string | null) => void;
    userName: string | null;
    userEmail: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
    children,
    initialImage,
    initialName,
    initialEmail,
}: {
    children: React.ReactNode;
    initialImage?: string | null;
    initialName?: string | null;
    initialEmail?: string | null;
}) {
    const [userImage, setUserImage] = useState<string | null>(initialImage ?? null);

    return (
        <UserContext.Provider
            value={{
                userImage,
                setUserImage,
                userName: initialName ?? null,
                userEmail: initialEmail ?? null,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

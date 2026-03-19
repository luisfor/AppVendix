'use client';

import React from 'react';
import { useUser } from './UserProvider';
import AvatarUploadButton from './AvatarUploadButton';

interface HeaderAvatarProps {
    userName: string;
    subtitle: string;
}

export default function HeaderAvatar({ userName, subtitle }: HeaderAvatarProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-[var(--text-main)]">
                    {userName}
                </span>
                <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest font-bold">
                    {subtitle}
                </span>
            </div>
            <AvatarUploadButton size="md" showEditOverlay={true} />
        </div>
    );
}

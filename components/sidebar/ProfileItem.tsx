"use client";

import { useState } from "react";

import { UserRole } from "@prisma/client";

import Avatar from "@/components/Avatar";
import SettingsModal from "./SettingsModal";

interface ProfileItemProps {
  currentUser: {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  };
}

const ProfileItem: React.FC<ProfileItemProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer transition hover:opacity-75"
      >
        <Avatar user={currentUser} />
      </div>
    </>
  );
};

export default ProfileItem;

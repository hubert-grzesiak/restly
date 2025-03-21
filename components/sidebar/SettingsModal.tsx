"use client";

import axios from "axios";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { User, UserRole } from "@prisma/client";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Input from "../inputs/Input";
import Modal from "../modals/Modal";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: {
    name?: User["name"];
    image?: User["image"];
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  };
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Edit your profile information.
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    src={
                      image ||
                      currentUser?.image ||
                      "/images/avatar-placeholder.png"
                    }
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
                    }
                  >
                    <Button disabled={isLoading} type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;

"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";

import { CldUploadButton } from "next-cloudinary";

import useConversation from "@/hooks/useConversation";
import MessageInput from "./MessageInput";

// interface UploadResult {
//   info: {
//     secure_url: string;
//     public_id?: string;
//     version?: number;
//   };
// }

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  // const handleUpload = (result: UploadResult) => {
  //   axios.post("/api/messages", {
  //     image: result.info.secure_url,
  //     conversationId: conversationId,
  //   });
  // };

  return (
    <div className="dark:bg-dusk dark:border-lightgray rounded-b-xl flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;

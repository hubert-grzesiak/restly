import React from "react";
import {
  IconCalendar,
  IconDetails,
  IconImageInPicture,
  IconLocation,
  IconPlus,
} from "@tabler/icons-react";
import { Steps } from "antd";

const Stepper = ({ steps }: { steps: number }) => {
  const stepsList = [
    {
      title: "Location",
      icon: <IconLocation />,
    },
    {
      title: "Details",
      icon: <IconDetails />,
    },
    {
      title: "Calendar",
      icon: <IconCalendar />,
    },
    {
      title: "Facilities",
      icon: <IconPlus />,
    },
    {
      title: "Images",
      icon: <IconImageInPicture />,
    },
  ];
  const items = stepsList.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  return <Steps current={steps} items={items} />;
};

export default Stepper;

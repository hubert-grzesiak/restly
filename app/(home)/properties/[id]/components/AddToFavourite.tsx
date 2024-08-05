"use client";

import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/icons";
import { motion } from "framer-motion";
import {
  toggleFavouriteProperty,
  isPropertyFavourite,
} from "@/lib/actions/properties/saveProperty";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddToFavouriteProps extends ComponentPropsWithoutRef<"button"> {
  propertyId: string;
  className?: string;
  variant?: "withText" | "iconOnly" | "smallScreen";
}

const AddToFavourite = ({
  propertyId,
  variant = "withText",
  className,
}: AddToFavouriteProps) => {
  const { data: session } = useSession();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const checkFavourite = async () => {
      const status = await isPropertyFavourite(propertyId);
      setIsFavourite(status!);
    };
    checkFavourite();
  }, [propertyId]); // Only re-run this effect if propertyId changes

  const handleToggleFavourite = async () => {
    if (!session) {
      toast("Please log in to save properties");
    }

    try {
      const newFavouriteStatus = await toggleFavouriteProperty(propertyId);
      setIsFavourite(newFavouriteStatus); // Directly use the boolean value returned
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500); // Duration of animation
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  return (
    <>
      <Button
        className={cn(
          variant == "iconOnly" &&
            "border-0 bg-transparent p-0 shadow-none hover:bg-transparent",
          className,
        )}
        variant="outline"
        onClick={handleToggleFavourite}
      >
        <motion.div
          animate={isFavourite ? { scale: isAnimating ? 1.5 : 1 } : {}}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <HeartIcon
            className={cn(
              "h-5 w-5 transition-all",
              isFavourite
                ? "fill-red-600"
                : variant === "iconOnly" && "h-6 w-6 fill-black/40 text-white",
            )}
          />
        </motion.div>

        {variant === "withText" &&
          (isFavourite ? (
            <span className="ml-2">Saved</span>
          ) : (
            <span className="ml-2">Save</span>
          ))}
      </Button>
    </>
  );
};

export default AddToFavourite;

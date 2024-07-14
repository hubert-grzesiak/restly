"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/icons";
import { motion } from "framer-motion";
import {
  toggleFavouriteProperty,
  isPropertyFavourite,
} from "@/lib/actions/properties/saveProperty";
import { toast } from "sonner";

const AddToFavourite = ({ propertyId }: { propertyId: string }) => {
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
      <Button className="" variant="outline" onClick={handleToggleFavourite}>
        <motion.div
          animate={isFavourite ? { scale: isAnimating ? 1.5 : 1 } : {}}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <HeartIcon
            className={`mr-2 h-5 w-5 transition-all ${
              isFavourite ? "fill-red-600" : ""
            }`}
          />
        </motion.div>
        {isFavourite ? "Saved" : "Save"}
      </Button>
    </>
  );
};

export default AddToFavourite;

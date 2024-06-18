"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/icons";
import { toggleFavoriteProperty } from "@/lib/actions/properties/saveProperty";
import { motion } from "framer-motion";

type Property = {
  id: string;
  isFavorite: boolean;
};

interface AddToFavouriteProps {
  property: Property;
}

const AddToFavourite: React.FC<AddToFavouriteProps> = ({ property }) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(property.isFavorite);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleFavorite = async () => {
    if (!session) return;

    try {
      await toggleFavoriteProperty(property.id);
      setIsAnimating(true);
      setIsFavorite(!isFavorite);
      setTimeout(() => setIsAnimating(false), 500); // Czas trwania animacji
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <>
      <Button className="" variant="outline" onClick={handleToggleFavorite}>
        <motion.div
          animate={isFavorite && { scale: isAnimating ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative">
          <HeartIcon
            className={`mr-2 h-5 w-5 transition-all ${
              isFavorite ? "fill-red-600" : ""
            }`}
          />
        </motion.div>
        Save
      </Button>
    </>
  );
};

export default AddToFavourite;

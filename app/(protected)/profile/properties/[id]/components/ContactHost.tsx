"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/icons";
import { toggleFavoriteProperty } from "@/lib/actions/properties/saveProperty";
import { motion } from "framer-motion";
import Link from "next/link";

function ContactHost({ property }) {
  return (
    <>
      <Link className="" href={`/conversations/${property.ownerId}`}>
        <div className="relative">
          <HeartIcon />
        </div>
        Contact Host
      </Link>
    </>
  );
}

export default ContactHost;

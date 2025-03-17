"use client";

import Link from "next/link";
import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieComponent = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Agree"
      cookieName="myCookieConsent"
      style={{ background: "#020303" }}
      buttonStyle={{
        color: "#12071b",
        fontSize: "13px",
        backgroundColor: "#fff",
      }}
      expires={150}>
      This website uses cookies to enhance the user experience.{" "}
      <Link href="/privacy-policy" style={{ fontSize: "10px" }}>
        Find out more
      </Link>
    </CookieConsent>
  );
};

export default CookieComponent;

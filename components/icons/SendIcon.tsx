import React from "react";
export function SendIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-send-2"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
      <path d="M6.5 12h14.5" />
    </svg>
  );
}

import { FC } from "react";

const ErrorIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" fill="#7E869E" fillOpacity="0.25" />
      <path
        d="M9 9L15 15"
        stroke="#222222"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M15 9L9 15"
        stroke="#222222"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default ErrorIcon;

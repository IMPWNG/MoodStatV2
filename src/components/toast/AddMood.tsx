/* eslint-disable react/jsx-no-undef */

import { useEffect, useState } from 'react';

type IToastProps = {
  onClick?: () => void;
  lastestMood?: string;
  timeStamp?: string;
  content?: string;
};

const Toast = (props: IToastProps) => {
  const [showToast, setShowToast] = useState(true);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
    setShowToast(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClick();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`pointer-events-auto mx-auto mb-4 w-96 max-w-full rounded-lg bg-primary-100 bg-clip-padding text-sm text-red-700 shadow-lg shadow-black/5 ${
        showToast ? 'block' : 'hidden' // Add this line
      }`}
      id="static-example"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-te-autohide="false"
      data-te-toast-init
      data-te-toast-show
    >
      <div className="flex items-center justify-between rounded-t-lg border-b-2 border-primary-200 bg-primary-100 bg-clip-padding px-4 pb-2 pt-2.5 text-primary-700">
        <p className="flex items-center font-bold text-primary-700">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="info-circle"
            className="mr-2 h-4 w-4 fill-current"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
            ></path>
          </svg>
          Latest Mood Added
        </p>
        <div className="flex items-center">
          <p className="text-xs text-primary-700">{props.timeStamp}</p>
          <button
            type="button"
            className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-toast-dismiss
            aria-label="Close"
            onClick={handleClick}
          >
            <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="break-words rounded-b-lg bg-primary-100 p-4 text-primary-700">
        {props.content}
      </div>
    </div>
  );
};

export { Toast };

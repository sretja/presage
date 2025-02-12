import React from "react";
import { Button } from "./Button";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:items-center justify-between py-3 md:py-6 lg:py-8 bg-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center divide-x divide-gray-200">
        <div className="font-display font-bold text-2xl sm:pr-3 leading-none">
          presage
        </div>
        <p className="text-gray-600 sm:pl-3 small sm:text-base mt-3 sm:mt-0">
          ©2021 Presage Inc.
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <a href="https://twitter.com/joinpresage">
          <Button color="white" size="small">
            <span className="mr-2 small">🐦</span>
            Twitter
          </Button>
        </a>
        <a href="https://github.com/coderinblack08/presage">
          <Button color="white" size="small">
            <span className="mr-2 small">🐙</span>
            GitHub
          </Button>
        </a>
        <a href="https://instagram.com/joinpresage">
          <Button color="white" size="small">
            <span className="mr-2 small">🌈</span>
            Instagram
          </Button>
        </a>
      </div>
    </footer>
  );
};

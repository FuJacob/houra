import React from "react";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background flex justify-between items-center py-8 font-semibold">
      <ul className="flex gap-4 items-center">
        <li className="font-black font-sans text-2xl italic mr-6">
          <a href="">HOURA</a>
        </li>
        <li className="rounded-full px-4 py-1 bg-primary">
          <a href="">Personal</a>
        </li>
        <li>
          <a href="">Business</a>
        </li>
        <li>
          <a href="">Platform</a>
        </li>
      </ul>
      <ul className="flex gap-4 items-center">
        <li>
          <a href="">Features</a>
        </li>
        <li>
          <a href="">Pricing</a>
        </li>
        <li>
          <a href="">Help</a>
        </li>
        <li>
          <a href="">Log in</a>
        </li>
        <li>
          <a href="">Register</a>
        </li>
      </ul>{" "}
    </nav>
  );
};

export default Navigation;

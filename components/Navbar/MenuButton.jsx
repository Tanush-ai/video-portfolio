/**
 * @file components/Navbar/MenuButton.jsx
 * Why this code exists:
 * Controls opening and closing of the main navigation menu modal, triggering spring rotation
 * animations on the bullet icon indicator.
 */

import React, { useRef, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import Menu from "./Menu";

/**
 * MenuButton component providing interactive toggle behavior for navbar modal.
 * 
 * Tricky logic:
 * Animates text transition from MENU to CLOSE while simultaneously spinning dot indicator 90 degrees
 * on mouse hover when menu is closed.
 * 
 * TODO: Add ESC key listener to close menu automatically.
 * 
 * @returns {React.ReactElement} Menu button toggle component
 */
const MenuButton = () => {
  const [isOpen, open] = useState(false);
  const offset = 10;
  const [dots, dotsApi] = useSpring(() => ({ from: { transform: `rotate(0deg)` } }));
  const [menu, menuApi] = useSpring(() => ({ from: { y: offset, opacity: 1 } }));
  const [close, closeApi] = useSpring(() => ({ from: { y: offset, opacity: 0 } }));

  /**
   * Toggles menu text transition between open and closed states.
   */
  const handleClick = () => {
    menuApi.stop();
    closeApi.stop();
    menuApi.start({ y: !isOpen ? -offset : offset, opacity: !isOpen ? 0 : 1 });
    closeApi.start({ y: !isOpen ? -offset : offset, opacity: !isOpen ? 1 : 0 });
  };

  /**
   * Closes the menu modal and resets dot rotation.
   */
  const closeMenu = () => {
    if (!isOpen) return;
    open(false);
    dotsApi.start({ transform: `rotate(0deg)` });
    handleClick();
  };

  /**
   * Handles click events outside button ref.
   * @param {MouseEvent} event - Native DOM click event
   */
  const handleWindowClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) closeMenu();
  };

  const ref = useRef();

  return (
    <>
      <Menu open={isOpen} onOutsideClick={handleWindowClick} onClose={closeMenu} />
      <div
        className={`nav_btn_lg py-6 flex items-center justify-center cursor-pointer transition-colors ${isOpen ? "bg-bg-alt" : "bg-brgray hover:bg-bg-alt"}`}
        ref={ref}
        onMouseEnter={() => !isOpen && dotsApi.start({ transform: `rotate(90deg)` })}
        onMouseLeave={() => !isOpen && dotsApi.start({ transform: `rotate(0deg)` })}
        onClick={() => { open(!isOpen); handleClick(); }}
      >
        <div className="flex flex-col h-6 items-center justify-center">
          <a.div style={menu}>MENU&nbsp;&nbsp;</a.div>
          <a.div style={close}>CLOSE&nbsp;&nbsp;</a.div>
        </div>
        <a.div style={dots}>•&nbsp;•</a.div>
      </div>
    </>
  );
};

export default MenuButton;

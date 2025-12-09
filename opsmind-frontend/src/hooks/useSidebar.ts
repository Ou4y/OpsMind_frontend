import { useState } from "react";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  function openSidebar() {
    setIsOpen(true);
  }

  function closeSidebar() {
    setIsOpen(false);
  }

  function toggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  return { isOpen, openSidebar, closeSidebar, toggleSidebar };
}
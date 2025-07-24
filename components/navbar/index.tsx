"use client";

import { useState } from "react";
import styles from "./styles.module.css";

type Link = {
  label: string;
  href: string;
};

type NavbarProps = {
  brand: string;
  links: Link[];
};

export default function Navbar({ brand, links }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>{brand}</div>

        <div className={styles.navToggle} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

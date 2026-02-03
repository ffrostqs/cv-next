"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

import { NavigationList } from "./NavigationList";
import { NAV_ITEMS } from "./navigation.config";
import { mobileNavStyles as s } from "./navigation.styles";
import type { NavDictionary } from "@/i18n/types";

interface Props {
  open: boolean;
  onClose: () => void;
  labels: NavDictionary;
}

const navMotion = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function MobileNavigation({ open, onClose, labels }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          className={clsx(s.root)}
          role="navigation"
          aria-label="Mobile navigation"
          variants={navMotion}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <NavigationList
            items={NAV_ITEMS}
            labels={labels}
            orientation="vertical"
            onNavigate={onClose}
          />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

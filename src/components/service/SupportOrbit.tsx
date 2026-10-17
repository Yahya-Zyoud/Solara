"use client";

import { Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./service.module.css";

export default function SupportOrbit() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.supportOrbit} aria-hidden="true">
      <svg viewBox="0 0 120 120" role="presentation">
        <defs>
          <linearGradient id="service-orbit-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--service-yellow)" />
            <stop offset="100%" stopColor="var(--service-green)" />
          </linearGradient>
        </defs>
        <motion.circle
          className={styles.orbitRing}
          cx="60" cy="60" r="48"
          fill="none" stroke="url(#service-orbit-gradient)" strokeWidth="3.5"
          strokeLinecap="round" strokeDasharray="270 32"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        />
        <motion.circle
          className={styles.orbitRing}
          cx="60" cy="60" r="35"
          fill="none" stroke="var(--service-green)" strokeWidth="3"
          strokeLinecap="round" strokeDasharray="164 56"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 13, ease: "linear", repeat: Infinity }}
        />
        <motion.circle
          className={styles.orbitRing}
          cx="60" cy="60" r="23"
          fill="none" stroke="var(--service-yellow)" strokeWidth="2.5"
          strokeLinecap="round" strokeDasharray="105 40"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        />
        <motion.circle
          className={styles.orbitCore}
          cx="60" cy="60" r="17"
          fill="var(--service-paper)"
          animate={reduceMotion ? undefined : { scale: [1, 1.09, 1] }}
          transition={{ duration: 3.4, ease: "easeInOut", repeat: Infinity }}
        />
        <Wrench x={47} y={47} width={26} height={26} strokeWidth={1.8} color="var(--service-yellow)" />
      </svg>
    </div>
  );
}

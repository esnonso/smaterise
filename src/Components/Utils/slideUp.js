"use client";

import { useEffect, useRef, useState } from "react";

const SlidingUp = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting); // Update visibility dynamically
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`sliding-text-up ${isVisible ? "in-view-up" : ""}`}
    >
      {children}
    </div>
  );
};

export default SlidingUp;

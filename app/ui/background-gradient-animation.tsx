"use client";
import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;

    const moveGradient = (e: MouseEvent) => {
      if (!interactiveRef.current) return;
      const rect = interactiveRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = Math.round((x / rect.width) * 100);
      const yPercent = Math.round((y / rect.height) * 100);
      interactiveRef.current.style.setProperty("--x", xPercent + "%");
      interactiveRef.current.style.setProperty("--y", yPercent + "%");
    };

    window.addEventListener("mousemove", moveGradient);

    return () => {
      window.removeEventListener("mousemove", moveGradient);
    };
  }, [interactive]);

  return (
    <div
      className={cn("h-screen relative overflow-hidden", containerClassName)}
    >
      <div
        ref={interactiveRef}
        className={cn("h-full w-full blur-[120px] absolute inset-0", className)}
        style={{
          background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(${firstColor}) 0%, rgba(${secondColor}) 20%, rgba(${thirdColor}) 40%, rgba(${fourthColor}) 60%, rgba(${fifthColor}) 80%)`,
        }}
      ></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

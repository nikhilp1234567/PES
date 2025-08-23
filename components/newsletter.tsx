"use client";

import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { FormNewsletter } from "./form-newsletter";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import { inputVariants } from "./ui/input";
import { useIsV0 } from "@/lib/context";
import { Bruno_Ace_SC } from "next/font/google";

const brunoAce = Bruno_Ace_SC({
  weight: ["400"],      // pick whatever weights/styles you need
  subsets: ["latin"],
});

const DURATION = 0.3;
const DELAY = DURATION;
const EASE_OUT = "easeOut";
const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const;
const SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 10,
  mass: 0.8,
};

export const Newsletter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isInitialRender = useRef(true);

  useEffect(() => {
    return () => {
      isInitialRender.current = false;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex overflow-hidden relative flex-col gap-4 justify-center items-center pt-10 w-full h-full short:lg:pt-10 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides short:lg:gap-4 lg:gap-8">
      <motion.div
        layout="position"
        transition={{ duration: DURATION, ease: EASE_OUT }}
      >
      <div className="flex flex-row justify-center items-center"><img className="w-40 h-40" src="/icon.svg" alt="" /> </div>
      </motion.div>
      
      {/* Wrap title and subtitle in the same condition as the email form */}
      {!isOpen && (
        <motion.div
          layout="position"
          transition={{ duration: DURATION, ease: EASE_OUT }}
        > 
          <div className="text-center">
            <h1
              className={cn(
                brunoAce.className,
                "text-3xl md:text-5xl tracking-tight text-primary mb-4"
              )}
            >
              Mekong
            </h1>
            <h2 className="text-lg md:text-lg font-light text-primary max-w-2xl mx-auto">
            Making climate resilience profitable
            </h2>
          </div>
        </motion.div>
      )}
      
      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresenceGuard>
          {!isOpen && (
            <motion.div
              key="newsletter"
              initial={isInitialRender.current ? false : "hidden"}
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  y: -150,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full min-w-[30vw] max-w-xl md:gap-6 lg:gap-8">
                <FormNewsletter
                  input={(props) => (
                    /* @ts-expect-error - Type mismatch */
                    <motion.input
                      autoCapitalize="off"
                      autoComplete="email"
                      placeholder="Join Waitlist"
                      className={inputVariants()}
                      initial={isInitialRender.current ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: DURATION,
                          ease: EASE_OUT_OPACITY,
                        },
                      }}
                      transition={{
                        duration: DURATION,
                        ease: EASE_OUT,
                        delay: DELAY,
                      }}
                      {...props}
                    />
                  )}
                  submit={(props) => (
                    /* @ts-expect-error - Type mismatch */
                    <motion.button
                      className={buttonVariants({
                        variant: "iconButton",
                        size: "icon-xl",
                      })}
                      {...props}
                      initial={isInitialRender.current ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: DURATION,
                          ease: EASE_OUT_OPACITY,
                        },
                      }}
                      transition={{
                        duration: DURATION,
                        ease: EASE_OUT,
                        delay: DELAY,
                      }}
                    >
                      <ArrowRightIcon className="w-4 h-4 text-current" />
                    </motion.button>
                  )}
                />
          
              </div>
            </motion.div>
          )}

          <motion.div
            layout="position"
            transition={SPRING}
            key="button"
            className={isOpen ? "my-6" : "mt-6"}
          >
            <Button
              className={cn("relative px-8")}
              onClick={() => setIsOpen(!isOpen)}
              shine={!isOpen}
            >
              <motion.span
                animate={{ x: isOpen ? -16 : 0 }}
                transition={{ duration: DURATION, ease: EASE_OUT }}
                className="inline-block"
              >
                About
              </motion.span>

              {isOpen && (
                <motion.div
                  className={cn(
                    buttonVariants({ variant: "iconButton", size: "icon" }),
                    "absolute -top-px -right-px aspect-square"
                  )}
                  initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY,
                  }}
                >
                  <Cross1Icon className="size-5 text-primary-foreground" />
                </motion.div>
              )}
            </Button>
          </motion.div>

          {isOpen && (
            <motion.div
              key="manifesto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                },
              }}
              className="relative flex min-h-0 flex-shrink overflow-hidden text-sm md:text-base max-h-[calc(70dvh-var(--footer-safe-area))] flex-col gap-8 text-center backdrop-blur-xl text-balance border-2 border-border/50 bg-primary/20 max-w-3xl text-foreground rounded-3xl ring-1 ring-offset-primary/10 ring-border/10 ring-offset-2 shadow-button"
            >
              <article className="relative overflow-y-auto italic p-6 h-full [&_p]:my-4">
              <p>We believe the most effective and affordable climate solutions are already found in nature. Yet, the value of healthy ecosystems has long been invisible to the financial systems that drive business. Our mission is to change that by empowering companies to invest confidently in natural infrastructure that protects their future.</p>
              <p>Extreme weather puts your assets at risk, leading to downtime, unpredictable costs, and higher insurance. Traditional concrete solutions are expensive and inflexible, while nature-based solutions have been overlooked due to a lack of trusted proof.</p>
              <p>Our platform solves this by providing clear, auditable proof of nature’s impact, translating ecosystem benefits into financial risk reduction and operational savings. </p><p>Now, you can see the ROI of investing in nature and build a more resilient, profitable business.</p>
              </article>
            </motion.div>
          )}
        </AnimatePresenceGuard>
      </div>
    </div>
  );
};

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  const isV0 = useIsV0();

  return isV0 ? <>{children}</> : <AnimatePresence mode="popLayout" propagate>{children}</AnimatePresence>;
};

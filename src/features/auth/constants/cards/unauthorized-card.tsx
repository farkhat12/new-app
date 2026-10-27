"use client";

import { Button } from "@/shared/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export function UnauthorizedCard() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-5">
      <motion.div
        initial={
          shouldReduceMotion ? false : { opacity: 0, scale: 0.85, y: 20 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-md rounded-xl border border-blue-100 bg-white p-4 text-center shadow-[0_20px_70px_-25px_rgba(37,99,235,0.22)] sm:p-8"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.15,
            duration: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 14,
          }}
          className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-8 ring-blue-50/50"
        >
          <ShieldAlert size={48} strokeWidth={1.5} />
        </motion.div>

        <h2 className="font-bold tracking-tight text-slate-900 sm:text-xl">
          Рұқсат жоқ
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-500 sm:text">
          Бұл бетке кіруге құқығыңыз жеткіліксіз. Қолжетімділік қажет болса,
          әкімшіге хабарласыңыз.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Login
        </button>
      </motion.div>
    </div>
  );
}

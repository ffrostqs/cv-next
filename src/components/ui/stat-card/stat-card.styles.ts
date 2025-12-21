import { cva } from "class-variance-authority";

export const statCardStyles = cva(
  `
  flex items-center flex-col justify-center
    relative rounded-2xl
    border border-white/10
    bg-gradient-to-br from-slate-900/80 to-slate-800/60
    backdrop-blur
    p-6
    transition-all
    hover:-translate-y-1
    hover:shadow-2xl hover:shadow-cyan-500/10
  `
);

export const statCardIcon = `
    mb-4 flex h-12 w-12 items-center justify-center
    rounded-xl
    bg-gradient-to-br from-fuchsia-500 to-purple-500
    text-white
  `;

export const statCardValue = "text-3xl font-semibold text-white mb-1";

export const statCardLabel = "text-sm text-slate-400";

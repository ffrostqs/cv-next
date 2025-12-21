export const experienceStyles = {
  timeline: {
    wrapper: "relative",
    line:
      "absolute left-6 md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 " +
      "bg-gradient-to-b from-cyan-500 via-orange-500 to-emerald-500",
    list: "space-y-20",
    item: "relative",
    iconBase:
      "absolute left-6 md:left-1/2 md:-ml-7 w-14 h-14 rounded-2xl " +
      "flex items-center justify-center z-10 shadow-xl shadow-cyan-500/30",
  },

  card: {
    wrapperBase:
      "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 " +
      "rounded-3xl p-6 transition-shadow " +
      "hover:shadow-2xl hover:shadow-cyan-500/20 " +
      "focus-within:ring-2 focus-within:ring-cyan-500/40",
    title: "text-2xl text-slate-900 dark:text-white mb-1",
    company: "block text-base font-normal text-slate-600 dark:text-slate-400",
    period: "text-sm text-slate-500 dark:text-slate-400 mb-4",
    description: "text-slate-600 dark:text-slate-400 mb-4",
    list: "space-y-2 mb-4",
    listItem: "flex items-start gap-3 text-slate-600 dark:text-slate-400",
    bulletBase: "w-2 h-2 rounded-full mt-2 bg-gradient-to-r",
    stack: "text-sm text-slate-700 dark:text-slate-300",
  },
};

"use client";

import { memo } from "react";
import type { FormEvent } from "react";
import type { Block } from "@/lib/blocks";

type FormProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  action?: string;
  method?: "post" | "get";
};

function FormBlock({ block }: { block: Block }) {
  const props = block.props as FormProps;
  const title = props.title ?? "Contact form";
  const description = props.description ?? "Let visitors reach you fast.";
  const submitLabel = props.submitLabel ?? "Send message";
  const action = props.action;
  const method = props.method ?? "post";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!action) {
      event.preventDefault();
    }
  };

  return (
    <form
      action={action}
      method={method}
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-[color:var(--text-primary)]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
          {description}
        </p>
      </div>

      <div className="mt-5 grid gap-4">
        <input
          name="name"
          placeholder="Name"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm"
        />
        <textarea
          name="message"
          rows={4}
          placeholder="Message"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm"
        />
      </div>

      <div className="mt-5">
        <button
          type="submit"
          className="rounded-full bg-[color:var(--color-primary)] px-5 py-2 text-sm font-semibold text-black"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default memo(FormBlock);

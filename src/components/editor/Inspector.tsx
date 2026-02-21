"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { z, type ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/components/ui/utils";
import type { Block } from "@/lib/blocks";
import { getBlockDefinition } from "@/lib/blocks";
import { useEditorStore } from "@/lib/editor/store";
import { AppIcon } from "@/icons/AppIcon";

const tabs = ["Content", "Style", "Layout", "Advanced"] as const;

type InspectorTab = (typeof tabs)[number];

type InspectorFormValues = {
  props: Record<string, unknown>;
  style?: Record<string, unknown>;
  layout?: Record<string, unknown>;
  meta?: Record<string, unknown>;
};

function getError(path: string, errors: FieldErrors<InspectorFormValues>) {
  return path
    .split(".")
    .reduce<FieldErrors<InspectorFormValues> | FieldError | undefined>(
      (acc, key) => {
        if (!acc || typeof acc !== "object") return undefined;
        return acc[key as keyof typeof acc] as FieldErrors<InspectorFormValues> | FieldError | undefined;
      },
      errors
    ) as FieldError | undefined;
}

function unwrapSchema(schema: ZodTypeAny): ZodTypeAny {
  if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
    return unwrapSchema(schema._def.innerType);
  }
  if (schema instanceof z.ZodDefault) {
    return unwrapSchema(schema._def.innerType);
  }
  if (schema instanceof z.ZodEffects) {
    return unwrapSchema(schema._def.schema);
  }
  return schema;
}

function getSchemaShape(schema: ZodTypeAny) {
  const unwrapped = unwrapSchema(schema);
  if (unwrapped instanceof z.ZodObject) {
    return unwrapped.shape;
  }
  return null;
}

function JsonField({
  label,
  value,
  onChange,
  helperText,
}: {
  label: string;
  value?: Record<string, unknown>;
  onChange: (value: Record<string, unknown> | undefined) => void;
  helperText?: string;
}) {
  const [text, setText] = useState(() =>
    value && Object.keys(value).length ? JSON.stringify(value, null, 2) : ""
  );
  const lastValue = useRef(value);

  useEffect(() => {
    if (lastValue.current !== value) {
      setText(value && Object.keys(value).length ? JSON.stringify(value, null, 2) : "");
      lastValue.current = value;
    }
  }, [value]);

  return (
    <label className="block">
      <span className="text-sm text-[color:var(--text-secondary)]">{label}</span>
      <textarea
        value={text}
        onChange={(event) => {
          const nextText = event.target.value;
          setText(nextText);
          try {
            const parsed = nextText.trim() ? (JSON.parse(nextText) as Record<string, unknown>) : undefined;
            onChange(parsed);
          } catch {
            // Ignore parse errors until valid JSON
          }
        }}
        rows={6}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-[color:var(--text-primary)]"
      />
      {helperText ? (
        <span className="mt-2 block text-xs text-[color:var(--text-secondary)]">
          {helperText}
        </span>
      ) : null}
    </label>
  );
}

function FieldRow({
  name,
  label,
  type,
  enumValues,
  register,
  error,
}: {
  name: string;
  label: string;
  type: "string" | "number" | "boolean" | "enum";
  enumValues?: string[];
  register: UseFormRegister<InspectorFormValues>;
  error?: string;
}) {
  if (type === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <input
          type="checkbox"
          {...register(name)}
          className="h-4 w-4 rounded border-white/40 bg-transparent"
        />
        <span className="text-sm">{label}</span>
      </label>
    );
  }

  return (
    <label className="block">
      <span className="text-sm text-[color:var(--text-secondary)]">{label}</span>
      {type === "enum" ? (
        <select
          {...register(name)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
        >
          {enumValues?.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type === "number" ? "number" : "text"}
          {...register(name, type === "number" ? { valueAsNumber: true } : undefined)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
        />
      )}
      {error ? (
        <span className="mt-1 block text-xs text-red-400">{error}</span>
      ) : null}
    </label>
  );
}

function getFieldType(schema: ZodTypeAny) {
  const unwrapped = unwrapSchema(schema);
  if (unwrapped instanceof z.ZodString) return { type: "string" as const };
  if (unwrapped instanceof z.ZodNumber) return { type: "number" as const };
  if (unwrapped instanceof z.ZodBoolean) return { type: "boolean" as const };
  if (unwrapped instanceof z.ZodEnum) {
    return { type: "enum" as const, values: unwrapped.options };
  }
  if (unwrapped instanceof z.ZodNativeEnum) {
    return { type: "enum" as const, values: Object.values(unwrapped.enum) as string[] };
  }
  return null;
}

function useInspectorForm(block: Block | null) {
  const definition = block ? getBlockDefinition(block.type) : undefined;
  const schema = definition?.schema;

  const formSchema = useMemo(() => {
    const propsSchema = schema ?? z.record(z.any());
    return z.object({
      props: propsSchema,
      style: z.any().optional(),
      layout: z.any().optional(),
      meta: z.any().optional(),
    });
  }, [schema]);

  return useForm<InspectorFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      props: block?.props ?? {},
      style: block?.style ?? {},
      layout: block?.layout ?? {},
      meta: block?.meta ?? {},
    },
  });
}

function InspectorComponent({
  className,
  onHide,
}: {
  className?: string;
  onHide?: () => void;
}) {
  const selectedBlockId = useEditorStore((state) => state.selection.blockId);
  const block = useEditorStore((state) =>
    selectedBlockId ? state.blocks.byId[selectedBlockId] : null
  );
  const upsertBlock = useEditorStore((state) => state.upsertBlock);
  const duplicateBlock = useEditorStore((state) => state.duplicateBlock);
  const [activeTab, setActiveTab] = useState<InspectorTab>("Content");

  const definition = block ? getBlockDefinition(block.type) : undefined;
  const schema = definition?.schema;
  const shape = schema ? getSchemaShape(schema) : null;

  const form = useInspectorForm(block);
  const { register, formState, watch, reset, setValue } = form;
  const propsValue = watch("props") as Record<string, unknown> | undefined;

  const updateProps = (next: Record<string, unknown>) => {
    setValue("props", next, { shouldDirty: true });
  };

  const lastSerialized = useRef<string | null>(null);

  useEffect(() => {
    reset({
      props: block?.props ?? {},
      style: block?.style ?? {},
      layout: block?.layout ?? {},
      meta: block?.meta ?? {},
    });
    lastSerialized.current = null;
  }, [block?.id, reset]);

  useEffect(() => {
    if (!block) return;
    const subscription = watch((values) => {
      if (!values) return;
      const serialized = JSON.stringify(values);
      if (lastSerialized.current === serialized) {
        return;
      }
      lastSerialized.current = serialized;
      upsertBlock(
        {
          ...block,
          props: (values as InspectorFormValues).props ?? {},
          style: (values as InspectorFormValues).style ?? {},
          layout: (values as InspectorFormValues).layout ?? {},
          meta: (values as InspectorFormValues).meta ?? {},
        },
        { recordHistory: false, dirty: true }
      );
    });

    return () => subscription.unsubscribe();
  }, [block, upsertBlock, watch]);

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col rounded-3xl border border-white/10 bg-[color:var(--surface-card)]/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Inspector
          </p>
          <h3 className="text-lg font-semibold">
            {block ? definition?.title ?? "Block" : "No selection"}
          </h3>
          {definition?.description ? (
            <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
              {definition.description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col items-end gap-2">
          {onHide ? (
            <button
              type="button"
              onClick={onHide}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)] hover:border-white/20"
            >
              <AppIcon name="close" size={12} decorative />
              Hide inspector
            </button>
          ) : null}
          {block ? (
            <>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                {block.type}
              </span>
              <button
                type="button"
                onClick={() => duplicateBlock(block.id)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[color:var(--text-secondary)] hover:border-white/20"
              >
                Duplicate
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-2xl px-3 py-1.5 text-xs font-medium transition",
              activeTab === tab
                ? "bg-white/10 text-[color:var(--text-primary)]"
                : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {!block ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-[color:var(--text-secondary)]">
          Select a block to edit its content and styles.
        </div>
      ) : (
        <FormProvider {...form}>
          <div className="mt-6 flex-1 overflow-y-auto pr-1">
            {activeTab === "Content" && (
              <div className="space-y-4">
                {block?.type === "buttons" ? (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-xs text-[color:var(--text-secondary)]">Align</span>
                        <select
                          value={(propsValue?.align as string) ?? "left"}
                          onChange={(event) => {
                            updateProps({ ...(propsValue ?? {}), align: event.target.value });
                          }}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="text-xs text-[color:var(--text-secondary)]">Size</span>
                        <select
                          value={(propsValue?.size as string) ?? "md"}
                          onChange={(event) => {
                            updateProps({ ...(propsValue ?? {}), size: event.target.value });
                          }}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                        >
                          <option value="sm">Small</option>
                          <option value="md">Medium</option>
                          <option value="lg">Large</option>
                        </select>
                      </label>
                    </div>

                    <div className="space-y-3">
                      {(Array.isArray(propsValue?.items) ? propsValue?.items : []).map(
                        (item, index) => {
                          const current = item as Record<string, unknown>;
                          return (
                            <div
                              key={`button-${index}`}
                              className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
                                  Button {index + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextItems = (propsValue?.items as unknown[]).filter(
                                      (_, idx) => idx !== index
                                    );
                                    updateProps({ ...(propsValue ?? {}), items: nextItems });
                                  }}
                                  className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-red-200"
                                >
                                  Remove
                                </button>
                              </div>

                              <label className="block">
                                <span className="text-xs text-[color:var(--text-secondary)]">Label</span>
                                <input
                                  value={(current.label as string) ?? ""}
                                  onChange={(event) => {
                                    const nextItems = (propsValue?.items as unknown[]).map(
                                      (entry, idx) =>
                                        idx === index
                                          ? { ...(entry as object), label: event.target.value }
                                          : entry
                                    );
                                    updateProps({ ...(propsValue ?? {}), items: nextItems });
                                  }}
                                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                                />
                              </label>

                              <label className="block">
                                <span className="text-xs text-[color:var(--text-secondary)]">Href</span>
                                <input
                                  value={(current.href as string) ?? ""}
                                  onChange={(event) => {
                                    const nextItems = (propsValue?.items as unknown[]).map(
                                      (entry, idx) =>
                                        idx === index
                                          ? { ...(entry as object), href: event.target.value }
                                          : entry
                                    );
                                    updateProps({ ...(propsValue ?? {}), items: nextItems });
                                  }}
                                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                                />
                              </label>

                              <div className="grid gap-3 sm:grid-cols-2">
                                <label className="block">
                                  <span className="text-xs text-[color:var(--text-secondary)]">Variant</span>
                                  <select
                                    value={(current.variant as string) ?? "primary"}
                                    onChange={(event) => {
                                      const nextItems = (propsValue?.items as unknown[]).map(
                                        (entry, idx) =>
                                          idx === index
                                            ? { ...(entry as object), variant: event.target.value }
                                            : entry
                                      );
                                      updateProps({ ...(propsValue ?? {}), items: nextItems });
                                    }}
                                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                                  >
                                    <option value="primary">Primary</option>
                                    <option value="outline">Outline</option>
                                    <option value="ghost">Ghost</option>
                                  </select>
                                </label>
                                <label className="block">
                                  <span className="text-xs text-[color:var(--text-secondary)]">Icon left</span>
                                  <input
                                    value={(current.iconLeft as string) ?? ""}
                                    onChange={(event) => {
                                      const nextItems = (propsValue?.items as unknown[]).map(
                                        (entry, idx) =>
                                          idx === index
                                            ? { ...(entry as object), iconLeft: event.target.value }
                                            : entry
                                      );
                                      updateProps({ ...(propsValue ?? {}), items: nextItems });
                                    }}
                                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                                  />
                                </label>
                              </div>
                            </div>
                          );
                        }
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          const nextItems = [
                            ...(Array.isArray(propsValue?.items) ? propsValue?.items : []),
                            { label: "New button", href: "#", variant: "primary" },
                          ];
                          updateProps({ ...(propsValue ?? {}), items: nextItems });
                        }}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[color:var(--text-secondary)] hover:border-white/20"
                      >
                        Add button
                      </button>
                    </div>
                  </div>
                ) : block?.type === "socials" ? (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-xs text-[color:var(--text-secondary)]">Align</span>
                        <select
                          value={(propsValue?.align as string) ?? "left"}
                          onChange={(event) => {
                            updateProps({ ...(propsValue ?? {}), align: event.target.value });
                          }}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="text-xs text-[color:var(--text-secondary)]">Variant</span>
                        <select
                          value={(propsValue?.variant as string) ?? "inline"}
                          onChange={(event) => {
                            updateProps({ ...(propsValue ?? {}), variant: event.target.value });
                          }}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                        >
                          <option value="inline">Inline</option>
                          <option value="card">Card</option>
                        </select>
                      </label>
                    </div>

                    <div className="space-y-3">
                      {(Array.isArray(propsValue?.items) ? propsValue?.items : []).map(
                        (item, index) => {
                          const current = item as Record<string, unknown>;
                          return (
                            <div
                              key={`social-${index}`}
                              className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
                                  Social {index + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextItems = (propsValue?.items as unknown[]).filter(
                                      (_, idx) => idx !== index
                                    );
                                    updateProps({ ...(propsValue ?? {}), items: nextItems });
                                  }}
                                  className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-red-200"
                                >
                                  Remove
                                </button>
                              </div>

                              <label className="block">
                                <span className="text-xs text-[color:var(--text-secondary)]">Label</span>
                                <input
                                  value={(current.label as string) ?? ""}
                                  onChange={(event) => {
                                    const nextItems = (propsValue?.items as unknown[]).map(
                                      (entry, idx) =>
                                        idx === index
                                          ? { ...(entry as object), label: event.target.value }
                                          : entry
                                    );
                                    updateProps({ ...(propsValue ?? {}), items: nextItems });
                                  }}
                                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                                />
                              </label>

                              <label className="block">
                                <span className="text-xs text-[color:var(--text-secondary)]">Href</span>
                                <input
                                  value={(current.href as string) ?? ""}
                                  onChange={(event) => {
                                    const nextItems = (propsValue?.items as unknown[]).map(
                                      (entry, idx) =>
                                        idx === index
                                          ? { ...(entry as object), href: event.target.value }
                                          : entry
                                    );
                                    updateProps({ ...(propsValue ?? {}), items: nextItems });
                                  }}
                                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                                />
                              </label>

                              <label className="block">
                                <span className="text-xs text-[color:var(--text-secondary)]">Icon</span>
                                <input
                                  value={(current.icon as string) ?? ""}
                                  onChange={(event) => {
                                    const nextItems = (propsValue?.items as unknown[]).map(
                                      (entry, idx) =>
                                        idx === index
                                          ? { ...(entry as object), icon: event.target.value }
                                          : entry
                                    );
                                    updateProps({ ...(propsValue ?? {}), items: nextItems });
                                  }}
                                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                                />
                              </label>
                            </div>
                          );
                        }
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          const nextItems = [
                            ...(Array.isArray(propsValue?.items) ? propsValue?.items : []),
                            { label: "New social", href: "#", icon: "github" },
                          ];
                          updateProps({ ...(propsValue ?? {}), items: nextItems });
                        }}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[color:var(--text-secondary)] hover:border-white/20"
                      >
                        Add social
                      </button>
                    </div>
                  </div>
                ) : shape ? (
                  Object.entries(shape).map(([key, value]) => {
                    const fieldType = getFieldType(value as ZodTypeAny);
                    const name = `props.${key}`;
                    const error = getError(name, formState.errors)?.message as string | undefined;
                    if (!fieldType) {
                      return (
                        <JsonField
                          key={key}
                          label={key}
                          value={(form.getValues("props") ?? {})[key] as Record<string, unknown> | undefined}
                          onChange={(nextValue) => {
                            const currentProps = form.getValues("props") ?? {};
                            setValue(
                              "props",
                              { ...currentProps, [key]: nextValue },
                              { shouldDirty: true }
                            );
                          }}
                        />
                      );
                    }
                    return (
                      <FieldRow
                        key={key}
                        name={name}
                        label={key}
                        type={fieldType.type}
                        enumValues={fieldType.type === "enum" ? fieldType.values : undefined}
                        register={register}
                        error={error}
                      />
                    );
                  })
                ) : (
                  <JsonField
                    label="Props"
                    value={form.getValues("props")}
                    onChange={(nextValue) => setValue("props", nextValue ?? {}, { shouldDirty: true })}
                    helperText="Schema not provided; edit raw props as JSON."
                  />
                )}
              </div>
            )}

            {activeTab === "Style" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
                    Text style
                  </p>
                  <label className="block">
                    <span className="text-xs text-[color:var(--text-secondary)]">Color</span>
                    <input
                      type="color"
                      value={(form.getValues("style")?.color as string) ?? "#ffffff"}
                      onChange={(event) => {
                        const current = form.getValues("style") ?? {};
                        setValue(
                          "style",
                          { ...current, color: event.target.value },
                          { shouldDirty: true }
                        );
                      }}
                      className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-white/5 p-1"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-[color:var(--text-secondary)]">Font size</span>
                    <input
                      type="text"
                      placeholder="24px"
                      value={(form.getValues("style")?.fontSize as string) ?? ""}
                      onChange={(event) => {
                        const current = form.getValues("style") ?? {};
                        setValue(
                          "style",
                          { ...current, fontSize: event.target.value },
                          { shouldDirty: true }
                        );
                      }}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-[color:var(--text-secondary)]">Font weight</span>
                    <input
                      type="text"
                      placeholder="400"
                      value={(form.getValues("style")?.fontWeight as string) ?? ""}
                      onChange={(event) => {
                        const current = form.getValues("style") ?? {};
                        setValue(
                          "style",
                          { ...current, fontWeight: event.target.value },
                          { shouldDirty: true }
                        );
                      }}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-[color:var(--text-secondary)]">Font family</span>
                    <input
                      type="text"
                      placeholder="var(--font-body)"
                      value={(form.getValues("style")?.fontFamily as string) ?? ""}
                      onChange={(event) => {
                        const current = form.getValues("style") ?? {};
                        setValue(
                          "style",
                          { ...current, fontFamily: event.target.value },
                          { shouldDirty: true }
                        );
                      }}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    />
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs text-[color:var(--text-secondary)]">Line height</span>
                      <input
                        type="text"
                        placeholder="1.4"
                        value={(form.getValues("style")?.lineHeight as string) ?? ""}
                        onChange={(event) => {
                          const current = form.getValues("style") ?? {};
                          setValue(
                            "style",
                            { ...current, lineHeight: event.target.value },
                            { shouldDirty: true }
                          );
                        }}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-[color:var(--text-secondary)]">Letter spacing</span>
                      <input
                        type="text"
                        placeholder="0.02em"
                        value={(form.getValues("style")?.letterSpacing as string) ?? ""}
                        onChange={(event) => {
                          const current = form.getValues("style") ?? {};
                          setValue(
                            "style",
                            { ...current, letterSpacing: event.target.value },
                            { shouldDirty: true }
                          );
                        }}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs text-[color:var(--text-secondary)]">Text align</span>
                    <select
                      value={(form.getValues("style")?.textAlign as string) ?? ""}
                      onChange={(event) => {
                        const current = form.getValues("style") ?? {};
                        setValue(
                          "style",
                          { ...current, textAlign: event.target.value },
                          { shouldDirty: true }
                        );
                      }}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    >
                      <option value="">Default</option>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </label>
                </div>
                <JsonField
                  label="Style"
                  value={form.getValues("style")}
                  onChange={(nextValue) => setValue("style", nextValue ?? {}, { shouldDirty: true })}
                  helperText="Add design tokens, colors, or typography overrides."
                />
              </div>
            )}

            {activeTab === "Layout" && (
              <div className="space-y-4">
                <JsonField
                  label="Layout"
                  value={form.getValues("layout")}
                  onChange={(nextValue) => setValue("layout", nextValue ?? {}, { shouldDirty: true })}
                  helperText="Configure spacing, columns, and responsive layout data."
                />
              </div>
            )}

            {activeTab === "Advanced" && (
              <div className="space-y-4">
                <JsonField
                  label="Meta"
                  value={form.getValues("meta")}
                  onChange={(nextValue) => setValue("meta", nextValue ?? {}, { shouldDirty: true })}
                  helperText="Store block metadata, AI prompts, or internal flags."
                />
              </div>
            )}
          </div>
        </FormProvider>
      )}
    </aside>
  );
}

export const Inspector = memo(InspectorComponent);

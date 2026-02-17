"use client";

import { useMemo, useState, useTransition } from "react";
import { cn } from "@/components/ui/utils";

type MenuRow = {
  id: string;
  label: string;
  href: string;
  parentLabel: string;
  order: number;
  isActiveGlobal: boolean;
  isActiveLocale: boolean;
  editHref: string;
};

export function AdminMenuTable({
  items,
  localeCode,
}: {
  items: MenuRow[];
  localeCode: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [rows, setRows] = useState<MenuRow[]>(() =>
    [...items].sort((a, b) => a.order - b.order)
  );

  const orderedIds = useMemo(() => rows.map((row) => row.id), [rows]);

  function handleDragStart(event: React.DragEvent<HTMLTableRowElement>, id: string) {
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.effectAllowed = "move";
  }

  function handleDrop(event: React.DragEvent<HTMLTableRowElement>, targetId: string) {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("text/plain");
    if (!draggedId || draggedId === targetId) return;

    const next = [...rows];
    const fromIndex = next.findIndex((row) => row.id === draggedId);
    const toIndex = next.findIndex((row) => row.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);

    const reordered = next.map((row, index) => ({
      ...row,
      order: index,
    }));

    setRows(reordered);

    startTransition(async () => {
      await fetch("/api/admin/menu/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: reordered.map((row) => ({ id: row.id, order: row.order })),
        }),
      });
    });
  }

  const activeRows = rows.filter(
    (row) => row.isActiveGlobal && row.isActiveLocale
  );
  const inactiveRows = rows.filter(
    (row) => !row.isActiveGlobal || !row.isActiveLocale
  );

  async function toggle(scope: "global" | "locale", row: MenuRow) {
    await fetch("/api/admin/menu/visibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        menuItemId: row.id,
        locale: localeCode,
        scope,
        isActive: scope === "global" ? !row.isActiveGlobal : !row.isActiveLocale,
      }),
    });
  }

  return (
    <div className={cn(isPending && "opacity-70")}>
      <div className="overflow-hidden rounded-xl border border-[color:var(--border-muted)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
            <tr>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Href</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Global</th>
              <th className="px-4 py-3">Locale</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeRows.map((item) => (
              <tr
                key={item.id}
                draggable
                onDragStart={(event) => handleDragStart(event, item.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, item.id)}
                className="border-t border-[color:var(--border-muted)] hover:bg-white/5"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[color:var(--text-secondary)]">⠿</span>
                    {item.label}
                  </div>
                </td>
                <td className="px-4 py-3 text-[color:var(--text-secondary)]">
                  {item.href}
                </td>
                <td className="px-4 py-3">{item.parentLabel}</td>
                <td className="px-4 py-3">
                  <button
                    className="ui-link text-xs"
                    onClick={() => toggle("global", item)}
                  >
                    {item.isActiveGlobal ? "On" : "Off"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="ui-link text-xs"
                    onClick={() => toggle("locale", item)}
                  >
                    {item.isActiveLocale ? "On" : "Off"}
                  </button>
                </td>
                <td className="px-4 py-3">{item.order}</td>
                <td className="px-4 py-3 text-right">
                  <a className="ui-link" href={item.editHref}>
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {inactiveRows.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-xl border border-[color:var(--border-muted)]">
          <div className="px-4 py-3 text-xs uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
            Inactive links
          </div>
          <table className="w-full text-left text-sm">
            <tbody>
              {inactiveRows.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[color:var(--border-muted)]"
                >
                  <td className="px-4 py-3">{item.label}</td>
                  <td className="px-4 py-3 text-[color:var(--text-secondary)]">
                    {item.href}
                  </td>
                  <td className="px-4 py-3">{item.parentLabel}</td>
                  <td className="px-4 py-3">
                    <button
                      className="ui-link text-xs"
                      onClick={() => toggle("global", item)}
                    >
                      {item.isActiveGlobal ? "On" : "Off"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="ui-link text-xs"
                      onClick={() => toggle("locale", item)}
                    >
                      {item.isActiveLocale ? "On" : "Off"}
                    </button>
                  </td>
                  <td className="px-4 py-3">{item.order}</td>
                  <td className="px-4 py-3 text-right">
                    <a className="ui-link" href={item.editHref}>
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-2 text-xs text-[color:var(--text-secondary)]">
        Drag rows to reorder. Changes save automatically.
      </p>
    </div>
  );
}

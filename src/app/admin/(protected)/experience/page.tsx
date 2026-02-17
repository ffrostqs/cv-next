import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteExperience } from "@/lib/admin-actions";
import { getDefaultLocale } from "@/lib/locales";

export default async function AdminExperience() {
  const defaultLocale = await getDefaultLocale();
  const items = await prisma.experienceItem.findMany({
    orderBy: { order: "asc" },
    include: {
      translations: defaultLocale
        ? { where: { localeId: defaultLocale.id } }
        : undefined,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Experience
          </p>
          <h2 className="text-2xl font-semibold">Experience items</h2>
        </div>
      </div>

      <div className="ui-surface-card p-0 overflow-hidden rounded-2xl">
        <table className="w-full text-sm">
          <thead className="text-left text-[color:var(--text-secondary)]">
            <tr className="border-b border-[color:var(--border-muted)]">
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Order</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const translation = item.translations[0];
              return (
                <tr
                  key={item.id}
                  className="border-b border-[color:var(--border-muted)] last:border-0"
                >
                  <td className="px-5 py-4">{translation?.role ?? ""}</td>
                  <td className="px-5 py-4">{translation?.company ?? ""}</td>
                  <td className="px-5 py-4">{item.order}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link className="ui-link" href={`/admin/experience/${item.id}/edit`}>
                        Edit
                      </Link>
                      <form action={deleteExperience.bind(null, item.id)}>
                        <button className="ui-link" type="submit">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

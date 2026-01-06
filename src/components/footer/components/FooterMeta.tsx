import { footerStyles as s } from "../footer.styles";

export function FooterMeta({
  copyright,
  builtWith,
}: {
  copyright: string;
  builtWith: string;
}) {
  return (
    <div className={s.meta}>
      <span>{copyright}</span>
      <span>{builtWith}</span>
    </div>
  );
}

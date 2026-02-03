import { FooterClient } from "./Footer.client";
import type { FooterModel } from "./footer.types";

export function Footer({ footer }: { footer: FooterModel }) {
  return <FooterClient footer={footer} />;
}

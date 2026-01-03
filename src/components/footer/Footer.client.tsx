"use client";

import type { FooterModel } from "./footer.types";
import { footerStyles as s } from "./footer.styles";
import { FooterNav } from "./components/FooterNav";
import { FooterSocials } from "./components/FooterSocials";
import { FooterMeta } from "./components/FooterMeta";

export function FooterClient({ footer }: { footer: FooterModel }) {
  return (
    <footer className={s.wrapper}>
      <div className={s.container}>
        <p className={s.tagline}>{footer.tagline}</p>

        <div className={s.grid}>
          <FooterNav links={footer.navigation} />
          <FooterSocials links={footer.socials} />
        </div>
      </div>

      <FooterMeta {...footer.meta} />
    </footer>
  );
}

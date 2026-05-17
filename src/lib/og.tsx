import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_ALT = "Etax — Raqamlar ortidagi strategiya";
export const OG_CONTENT_TYPE = "image/png";

type Locale = "uz" | "ru";

const COPY: Record<Locale, {
  eyebrow: string;
  h1: string;
  h1Accent: string;
  sub: string;
  stats: string;
}> = {
  uz: {
    eyebrow: "ETAX · FARG'ONA · EST. 2012",
    h1: "Raqamlar ortidagi",
    h1Accent: "strategiya.",
    sub: "Moliyaviy konsalting · Soliq · IFRS · CFO",
    stats: "12+ YIL · 320+ MIJOZ",
  },
  ru: {
    eyebrow: "ETAX · ФЕРГАНА · EST. 2012",
    h1: "За цифрами —",
    h1Accent: "стратегия.",
    sub: "Финансовый консалтинг · Налоги · IFRS · CFO",
    stats: "12+ ЛЕТ · 320+ КЛИЕНТОВ",
  },
};

export function renderOgImage(locale: Locale = "uz") {
  const meta = COPY[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(160deg, #143A6C 0%, #1C4A8A 60%, #143A6C 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "80px 80px 72px 80px",
          color: "#FAF8F4",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,139,230,0.45) 0%, transparent 65%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "auto",
          }}
        >
          <div style={{ width: "60px", height: "3px", background: "#228BE6" }} />
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "3px",
              color: "#228BE6",
              fontWeight: 600,
            }}
          >
            {meta.eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "40px",
            lineHeight: 1,
          }}
        >
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            {meta.h1}
          </div>
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              letterSpacing: "-2px",
              color: "#228BE6",
              lineHeight: 1.05,
            }}
          >
            {meta.h1Accent}
          </div>
        </div>

        <div
          style={{
            fontSize: "28px",
            marginTop: "32px",
            color: "rgba(250,248,244,0.75)",
          }}
        >
          {meta.sub}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(250,248,244,0.18)",
            paddingTop: "28px",
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "3px",
            color: "rgba(250,248,244,0.6)",
          }}
        >
          <div style={{ display: "flex" }}>TAXSERVICE.UZ</div>
          <div style={{ display: "flex" }}>{meta.stats}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

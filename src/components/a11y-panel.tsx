"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  PersonArmsSpread,
  X,
  TextAa,
  ArrowsClockwise,
} from "@phosphor-icons/react/dist/ssr";

type View = "normal" | "grayscale" | "contrast";

const STORAGE_KEY = "etax-a11y";
const ZOOM_MIN = 1;
const ZOOM_MAX = 1.5;
const ZOOM_STEP = 0.1;

type Saved = { view: View; zoom: number };

function loadSaved(): Saved {
  if (typeof window === "undefined") return { view: "normal", zoom: 1 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { view: "normal", zoom: 1 };
    const parsed = JSON.parse(raw) as Partial<Saved>;
    const view: View =
      parsed.view === "grayscale" || parsed.view === "contrast"
        ? parsed.view
        : "normal";
    const zoom =
      typeof parsed.zoom === "number" &&
      parsed.zoom >= ZOOM_MIN &&
      parsed.zoom <= ZOOM_MAX
        ? parsed.zoom
        : 1;
    return { view, zoom };
  } catch {
    return { view: "normal", zoom: 1 };
  }
}

function applyToDocument(view: View, zoom: number) {
  const root = document.documentElement;
  if (view === "normal") root.removeAttribute("data-a11y-view");
  else root.setAttribute("data-a11y-view", view);

  if (zoom === 1) {
    root.removeAttribute("data-a11y-zoom");
    root.style.removeProperty("--a11y-zoom");
  } else {
    root.setAttribute("data-a11y-zoom", "");
    root.style.setProperty("--a11y-zoom", String(zoom));
  }
}

export function A11yPanel() {
  const t = useTranslations("a11y");
  const reduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("normal");
  const [zoom, setZoom] = useState(1);
  // `draftZoom` follows the slider thumb in real time. The expensive CSS
  // `zoom` reflow is only triggered when the user releases the slider
  // (`commitZoom`) — otherwise dragging would re-layout the whole page on
  // every pointer move and the screen would flicker.
  const [draftZoom, setDraftZoom] = useState(1);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = loadSaved();
    setView(saved.view);
    setZoom(saved.zoom);
    setDraftZoom(saved.zoom);
    applyToDocument(saved.view, saved.zoom);
    setMounted(true);
  }, []);

  useEffect(() => {
    setDraftZoom(zoom);
  }, [zoom]);

  useEffect(() => {
    if (!mounted) return;
    applyToDocument(view, zoom);
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ view, zoom })
      );
    } catch {
      // ignore quota / private mode errors
    }
  }, [view, zoom, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const zoomPct = Math.round((draftZoom - 1) * 100);

  const commitZoom = () => {
    if (draftZoom !== zoom) setZoom(draftZoom);
  };

  const reset = () => {
    setView("normal");
    setZoom(1);
    setDraftZoom(1);
  };

  const VIEWS: { id: View; label: string; circleCls: string }[] = [
    {
      id: "normal",
      label: t("view.normal"),
      circleCls: "bg-primary text-paper border-primary",
    },
    {
      id: "grayscale",
      label: t("view.grayscale"),
      circleCls: "bg-muted text-paper border-muted",
    },
    {
      id: "contrast",
      label: t("view.contrast"),
      circleCls: "bg-ink text-paper border-ink",
    },
  ];

  const motionPanel = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.98 },
        transition: { duration: 0.22, ease: [0.2, 0.7, 0.2, 1] as const },
      };

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("toggleLabel")}
        aria-expanded={open}
        aria-controls="a11y-panel"
        className="fixed z-60 bottom-5 right-5 sm:bottom-8 sm:right-8 inline-flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-navy text-paper border border-paper shadow-lg shadow-navy/20 hover:bg-primary hover:border-paper transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
      >
        <PersonArmsSpread size={24} weight="bold" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="a11y-panel"
            ref={panelRef}
            role="dialog"
            aria-label={t("title")}
            {...motionPanel}
            className="fixed z-60 bottom-36 right-3 sm:bottom-40 sm:right-8 w-[calc(100vw-24px)] max-w-85 bg-paper text-ink border border-line shadow-deep p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <h2 className="text-base font-semibold tracking-tight">
                {t("title")}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label={t("close")}
                className="inline-flex items-center justify-center w-7 h-7 -mr-1 text-muted hover:text-ink transition-colors"
              >
                <X size={16} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <fieldset className="mb-6">
              <legend className="eyebrow mb-3">{t("view.label")}</legend>
              <div
                role="radiogroup"
                aria-label={t("view.label")}
                className="flex items-center gap-3"
              >
                {VIEWS.map((v) => {
                  const active = view === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      aria-label={v.label}
                      onClick={() => {
                        setView(v.id);
                        // Close the panel shortly after selecting so the user
                        // can see the chosen mode applied to the whole page.
                        window.setTimeout(() => setOpen(false), 180);
                      }}
                      className={`relative inline-flex items-center justify-center w-11 h-11 rounded-full border-2 font-semibold text-base transition-transform ${v.circleCls} ${
                        active
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-paper scale-105"
                          : "opacity-80 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <span aria-hidden="true">A</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted">
                {view === "normal" && t("view.descNormal")}
                {view === "grayscale" && t("view.descGrayscale")}
                {view === "contrast" && t("view.descContrast")}
              </p>
            </fieldset>

            <fieldset className="mb-5">
              <legend className="eyebrow mb-3 flex items-center gap-2">
                <TextAa size={14} weight="bold" aria-hidden="true" />
                <span>{t("zoom.label")}</span>
              </legend>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted">
                  {t("zoom.value", { pct: zoomPct })}
                </span>
                <div className="inline-flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setZoom((z) =>
                        Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2))
                      )
                    }
                    disabled={zoom <= ZOOM_MIN}
                    aria-label={t("zoom.decrease")}
                    className="inline-flex items-center justify-center w-7 h-7 border border-line text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream transition-colors"
                  >
                    <span aria-hidden="true" className="text-sm leading-none">
                      −
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setZoom((z) =>
                        Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2))
                      )
                    }
                    disabled={zoom >= ZOOM_MAX}
                    aria-label={t("zoom.increase")}
                    className="inline-flex items-center justify-center w-7 h-7 border border-line text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream transition-colors"
                  >
                    <span aria-hidden="true" className="text-sm leading-none">
                      +
                    </span>
                  </button>
                </div>
              </div>
              <input
                type="range"
                min={ZOOM_MIN}
                max={ZOOM_MAX}
                step={ZOOM_STEP}
                value={draftZoom}
                onChange={(e) => setDraftZoom(parseFloat(e.target.value))}
                onMouseUp={commitZoom}
                onTouchEnd={commitZoom}
                onKeyUp={commitZoom}
                onPointerUp={commitZoom}
                aria-label={t("zoom.label")}
                aria-valuetext={t("zoom.value", { pct: zoomPct })}
                className="w-full accent-primary cursor-pointer"
              />
            </fieldset>

            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink transition-colors"
            >
              <ArrowsClockwise size={12} weight="bold" aria-hidden="true" />
              <span>{t("reset")}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

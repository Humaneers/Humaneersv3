"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type ArcItem = {
  label: string;
  /** One short line under the label. */
  line: string;
  href: string;
};

export type ArcCarouselProps = {
  items: readonly ArcItem[];
  /** Accessible name for the carousel region. */
  label: string;
  /** The card in front on load. */
  initial?: number;
  className?: string;
};

/** The same query the stylesheet gates the 3D stage on. Keep the two in step. */
const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Horizontal travel before a press counts as a drag rather than a click. */
const DRAG_START_PX = 6;
/** How far past either end a drag can pull, in cards, before it stops. */
const OVERDRAG = 0.35;
/** A focus this soon after a pointer press came from the press, not the keyboard. */
const POINTER_FOCUS_MS = 800;

/**
 * Typographic cards on the inside of a perspective arc. Each card is a link.
 *
 * CSS owns the geometry. Each card carries its signed distance from the front
 * card as --o and the absolute distance as --a, and the stylesheet turns them
 * into rotateY and translateZ round a cylinder (--arc-depth), a little blur
 * and dimming toward the edges, and a slight parallax on the card's text.
 *
 * The 3D stage switches on after hydration, and only where motion is allowed.
 * The server render, a visitor with no JS, reduced motion and print all get
 * the same markup as a plain row of sharp, readable cards, so nothing is ever
 * hidden behind the effect.
 *
 * Keyboard: every card is a link in the tab order, and focusing one brings it
 * to the front, so focus never lands on a card that is blurred or off screen.
 * The previous and next buttons move the arc one card and announce the card
 * now in front. Pointer: drag the arc, or click a side card to bring it
 * forward; the front card's link navigates. No autoplay.
 */
export function ArcCarousel({ items, label, initial = 0, className }: ArcCarouselProps) {
  const count = items.length;
  const clamp = (index: number) => Math.min(Math.max(index, 0), count - 1);

  const [active, setActive] = useState(() => clamp(initial));
  const [live, setLive] = useState(false);
  // Pointer travel while dragging, in cards; null when no drag is under way.
  const [drag, setDrag] = useState<number | null>(null);
  const [announce, setAnnounce] = useState(false);

  const stageId = useId();
  const press = useRef<{ id: number; x: number; step: number; dragging: boolean } | null>(null);
  const pressedAt = useRef(Number.NEGATIVE_INFINITY);
  const swallowClick = useRef(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia(MOTION_OK);
    const sync = () => setLive(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  /** Brings a card to the front and tells a screen reader which one it is. */
  function show(index: number) {
    setActive(clamp(index));
    setAnnounce(true);
  }

  function onPointerDown(event: PointerEvent<HTMLUListElement>) {
    pressedAt.current = event.timeStamp;
    swallowClick.current = false;
    if (!live || !event.isPrimary || event.button !== 0) return;
    const card = event.currentTarget.querySelector<HTMLElement>("[data-arc-card]");
    press.current = {
      id: event.pointerId,
      x: event.clientX,
      step: card?.offsetWidth || 280,
      dragging: false,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLUListElement>) {
    const current = press.current;
    if (!current || event.pointerId !== current.id) return;
    const dx = event.clientX - current.x;
    if (!current.dragging) {
      if (Math.abs(dx) < DRAG_START_PX) return;
      current.dragging = true;
      // Captured only once it is a drag, so a plain click still lands on its link.
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
    const position = Math.min(
      Math.max(active - dx / current.step, -OVERDRAG),
      count - 1 + OVERDRAG
    );
    setDrag(active - position);
  }

  function endPress(event: PointerEvent<HTMLUListElement>) {
    const current = press.current;
    press.current = null;
    if (!current || !current.dragging) return;
    // A drag swallows only the click it makes itself. A browser sends that click
    // in the same task as this pointerup, if it sends it to a card at all (with
    // the pointer captured, Chrome sends it to the list instead), so the flag
    // is dropped on the next tick and can never eat a later click.
    swallowClick.current = true;
    window.setTimeout(() => {
      swallowClick.current = false;
    }, 0);
    const moved = Math.round(-(event.clientX - current.x) / current.step);
    setDrag(null);
    if (moved !== 0) show(active + moved);
  }

  function onCardClick(event: MouseEvent<HTMLAnchorElement>, index: number) {
    // detail is 0 for a click the keyboard made, which always navigates.
    const fromPointer = event.detail > 0;
    if (swallowClick.current && fromPointer) {
      swallowClick.current = false;
      event.preventDefault();
      return;
    }
    // A pointer click on a side card brings it forward; the front card navigates.
    if (live && index !== active && fromPointer) {
      event.preventDefault();
      show(index);
    }
  }

  function onCardFocus(event: FocusEvent<HTMLAnchorElement>, index: number) {
    if (!live || index === active) return;
    // A mouse or touch press focuses the link too; its click decides instead.
    if (event.timeStamp - pressedAt.current < POINTER_FOCUS_MS) return;
    // No announcement: the screen reader already reads the focused link.
    setActive(index);
  }

  const atStart = active === 0;
  const atEnd = active === count - 1;

  return (
    <div
      className={cn("arc", className)}
      data-arc={live ? "3d" : "flat"}
      data-dragging={drag !== null ? "true" : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <ul
        id={stageId}
        className="arc__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPress}
        onPointerCancel={() => {
          press.current = null;
          setDrag(null);
        }}
      >
        {items.map((item, index) => {
          const offset = index - active + (drag ?? 0);
          const distance = Math.abs(offset);
          return (
            <li
              key={item.href}
              className="arc__slot"
              data-arc-card=""
              data-active={index === active ? "true" : "false"}
              style={
                {
                  "--o": offset.toFixed(3),
                  "--a": distance.toFixed(3),
                  zIndex: count - Math.round(distance),
                } as CSSProperties
              }
            >
              <Link
                href={item.href}
                className="arc__card"
                draggable={false}
                onClick={(event) => onCardClick(event, index)}
                onFocus={(event) => onCardFocus(event, index)}
              >
                <span className="arc__label">{item.label}</span>
                <span className="arc__line">{item.line}</span>
                <ArrowUpRight aria-hidden="true" className="arc__icon" />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="arc__controls">
        <button
          type="button"
          className="arc__button"
          aria-label="Previous service"
          aria-controls={stageId}
          aria-disabled={atStart}
          onClick={() => !atStart && show(active - 1)}
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          className="arc__button"
          aria-label="Next service"
          aria-controls={stageId}
          aria-disabled={atEnd}
          onClick={() => !atEnd && show(active + 1)}
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>

      {/* Announces the card a button or a drag brought forward. Silent on load. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announce ? items[active].label : ""}
      </p>
    </div>
  );
}

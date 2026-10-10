import { useEffect, useRef, useState } from "react";

const MIN_THUMB_HEIGHT = 56;
const FADE_DELAY_MS = 850;

type ScrollbarState = {
  top: number;
  height: number;
  visible: boolean;
};

function getScrollbarState(): ScrollbarState {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const viewportHeight = window.innerHeight;
  const scrollHeight = Math.max(doc.scrollHeight, document.body.scrollHeight, viewportHeight);
  const maxScroll = Math.max(scrollHeight - viewportHeight, 0);

  if (maxScroll <= 1) {
    return { top: 0, height: 0, visible: false };
  }

  const trackPadding = 14;
  const trackHeight = viewportHeight - trackPadding * 2;
  const thumbHeight = Math.max(MIN_THUMB_HEIGHT, (viewportHeight / scrollHeight) * trackHeight);
  const travel = Math.max(trackHeight - thumbHeight, 0);
  const top = trackPadding + (scrollTop / maxScroll) * travel;

  return { top, height: thumbHeight, visible: true };
}

export default function FloatingScrollbar() {
  const [scrollbar, setScrollbar] = useState<ScrollbarState>({ top: 0, height: 0, visible: false });
  const [isActive, setIsActive] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const drag = useRef<{ startY: number; startScrollY: number } | null>(null);

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };

    const update = (show = false) => {
      if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return;
      setScrollbar(getScrollbarState());
      if (show) {
        clearHideTimer();
        setIsActive(true);
        hideTimer.current = window.setTimeout(() => setIsActive(false), FADE_DELAY_MS);
      }
    };

    const onScroll = () => update(true);
    const onResize = () => update(false);

    update(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const resizeObserver = new ResizeObserver(() => update(false));
    resizeObserver.observe(document.body);

    return () => {
      clearHideTimer();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!drag.current) return;

      const doc = document.documentElement;
      const viewportHeight = window.innerHeight;
      const scrollHeight = Math.max(doc.scrollHeight, document.body.scrollHeight, viewportHeight);
      const maxScroll = Math.max(scrollHeight - viewportHeight, 0);
      const trackHeight = viewportHeight - 28;
      const travel = Math.max(trackHeight - scrollbar.height, 1);
      const delta = event.clientY - drag.current.startY;
      const nextScroll = drag.current.startScrollY + (delta / travel) * maxScroll;

      window.scrollTo({ top: Math.max(0, Math.min(maxScroll, nextScroll)), behavior: "auto" });
    };

    const onPointerUp = () => {
      drag.current = null;
      document.body.classList.remove("is-dragging-scrollbar");
      window.setTimeout(() => setIsActive(false), FADE_DELAY_MS);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [scrollbar.height]);

  if (!scrollbar.visible) return null;

  return (
    <div
      className={`floating-scrollbar ${isActive ? "is-visible" : ""}`}
      aria-hidden="true"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        if (!drag.current) setIsActive(false);
      }}
    >
      <div
        className="floating-scrollbar__thumb"
        style={{ height: `${scrollbar.height}px`, transform: `translate3d(0, ${scrollbar.top}px, 0)` }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.current = { startY: event.clientY, startScrollY: window.scrollY };
          document.body.classList.add("is-dragging-scrollbar");
          setIsActive(true);
        }}
      />
    </div>
  );
}

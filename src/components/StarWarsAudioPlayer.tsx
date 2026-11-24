import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function StarWarsAudioPlayer() {
  const [isHovered, setIsHovered] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const isAboutPage = location.pathname === "/" || location.pathname === "/about";

  useEffect(() => {
    const handleScroll = () => {
      // Considered at the top when scroll position is near the top hero (less than 120px)
      const atTop = window.scrollY < 120;
      setIsAtTop(atTop);
      if (!atTop) {
        setIsHovered(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsHovered(false);
  }, [location.pathname]);

  // On About page: strictly allowed only at the top of the page.
  // When scrolled down into the page/footer, it is completely hidden and disabled.
  const isAllowedOnPage = isAboutPage ? isAtTop : true;
  const isVisible = isAllowedOnPage && isHovered;

  const embedUrl =
    "https://open.spotify.com/embed/track/3UqSTlEwO5spY8YL3GfQGv?utm_source=generator&theme=0&si=fb7ad709bf1643e8";

  return (
    <>
      {/* Invisible Hover Sensor Zone on bottom-left - only active when at top on About page */}
      {isAllowedOnPage && !isVisible && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "360px",
            height: "180px",
            zIndex: 9998,
            cursor: "pointer",
          }}
          aria-hidden="true"
        />
      )}

      {/* Spotify Embed Widget - completely hidden when scrolled down on About page */}
      {isAllowedOnPage && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "fixed",
            left: "18px",
            bottom: "16px",
            zIndex: 9999,
            width: "350px",
            maxWidth: "calc(100vw - 36px)",
            height: "152px",
            borderRadius: "12px",
            overflow: "hidden",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.35s ease",
            pointerEvents: isVisible ? "auto" : "none",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.75)",
            background: "#121212",
          }}
        >
          <iframe
            data-testid="embed-iframe"
            style={{
              border: 0,
              borderRadius: "12px",
              width: "100%",
              height: "152px",
              display: "block",
              overflow: "hidden",
            }}
            src={embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Music Player"
          />
        </div>
      )}
    </>
  );
}

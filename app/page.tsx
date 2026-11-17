"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Gift,
  ChevronDown,
  Sparkle,
} from "lucide-react";

export default function WeddingCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Audio Reference (public/sajna.mp3)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-28T19:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Royal Confetti & Petals Burst
  const triggerRoyalConfetti = () => {
    const colors = ["#D4AF37", "#FFDF73", "#800020", "#C5A059", "#FAF0E6"];
    for (let i = 0; i < 70; i++) {
      const el = document.createElement("div");
      el.style.position = "fixed";
      el.style.left = Math.random() * 100 + "vw";
      el.style.top = "-20px";
      el.style.width = Math.random() * 12 + 6 + "px";
      el.style.height = Math.random() * 16 + 8 + "px";
      el.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      el.style.zIndex = "99999";
      el.style.pointerEvents = "none";
      el.style.borderRadius = "50% 0 50% 50%";
      el.style.boxShadow = "0 0 10px rgba(212, 175, 55, 0.5)";
      el.style.transition =
        "transform 2.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.8s ease-out";
      document.body.appendChild(el);

      setTimeout(() => {
        el.style.transform = `translate(${Math.random() * 160 - 80}px, 105vh) rotate(${Math.random() * 720}deg)`;
        el.style.opacity = "0";
      }, 20);

      setTimeout(() => el.remove(), 2900);
    }
  };

  // لفافہ کھولنے کا فنکشن اور ساتھ میوزک پلے
  const handleOpenEnvelope = () => {
    setIsOpen(true);
    triggerRoyalConfetti();

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Autoplay blocked by browser policy:", err);
        });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // RSVP فارم سبمٹ ہونے پر گفٹ اوپن ہوگا
  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      setIsSubmitted(true);
      triggerRoyalConfetti();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        padding: isOpen ? "50px 16px 80px 16px" : "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0F0C0A",
      }}
    >
      {/* 🎵 آڈیو پاتھ (public/sajna.mp3) */}
      <audio ref={audioRef} src="/sajna.mp3" loop preload="auto" />

      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Marcellus&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap"
      />

      <style>{`
        @keyframes luxuryShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 18px; }
        }
        .animated-gold-text {
          background: linear-gradient(90deg, #996515 0%, #F5D77F 25%, #AA7C11 50%, #FDFBF7 75%, #996515 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: luxuryShimmer 5s linear infinite;
        }
        .music-bar-1 { animation: soundWave 1.2s ease-in-out infinite; }
        .music-bar-2 { animation: soundWave 0.8s ease-in-out infinite 0.2s; }
        .music-bar-3 { animation: soundWave 1.4s ease-in-out infinite 0.4s; }
      `}</style>

      {/* 🎶 FLOATING MUSIC CONTROL BUTTON */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMusic}
          title={isPlaying ? "Mute Music" : "Play Music"}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            backgroundColor: "#1C1714",
            border: "1.5px solid #D4AF37",
            borderRadius: "50px",
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.7), 0 0 15px rgba(212,175,55,0.3)",
            color: "#FAF7EE",
          }}
        >
          {isPlaying ? (
            <>
              <Volume2 size={18} color="#D4AF37" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  height: "18px",
                }}
              >
                <span
                  className="music-bar-1"
                  style={{
                    width: "2px",
                    backgroundColor: "#D4AF37",
                    borderRadius: "2px",
                  }}
                />
                <span
                  className="music-bar-2"
                  style={{
                    width: "2px",
                    backgroundColor: "#D4AF37",
                    borderRadius: "2px",
                  }}
                />
                <span
                  className="music-bar-3"
                  style={{
                    width: "2px",
                    backgroundColor: "#D4AF37",
                    borderRadius: "2px",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#D4AF37",
                  textTransform: "uppercase",
                }}
              >
                Playing
              </span>
            </>
          ) : (
            <>
              <VolumeX size={18} color="#8C7A6B" />
              <span
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#8C7A6B",
                  textTransform: "uppercase",
                }}
              >
                Music Paused
              </span>
            </>
          )}
        </motion.button>
      )}

      {/* ================= BACKGROUND LIVING GLOW ================= */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.55, 0.8, 0.55],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: "-15%",
          left: "-15%",
          width: "130vw",
          height: "130vh",
          background:
            "radial-gradient(circle at 50% 50%, rgba(128, 0, 32, 0.28) 0%, rgba(212, 175, 55, 0.15) 35%, rgba(15, 12, 10, 0.95) 75%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ================= 1. THE LUXURY WAX SEAL ENVELOPE ================= */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            exit={{ opacity: 0, scale: 1.12, filter: "blur(8px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(10, 8, 7, 0.96)",
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                width: "100%",
                maxWidth: "460px",
                background: "linear-gradient(160deg, #1C1714 0%, #120E0D 100%)",
                border: "1px solid rgba(212, 175, 55, 0.5)",
                padding: "60px 30px",
                textAlign: "center",
                boxShadow:
                  "0 25px 90px rgba(0,0,0,0.9), inset 0 0 30px rgba(212,175,55,0.08)",
                position: "relative",
                borderRadius: "4px",
              }}
            >
              {/* Corner Accents */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map(
                (pos, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: pos.includes("top") ? "12px" : "auto",
                      bottom: pos.includes("bottom") ? "12px" : "auto",
                      left: pos.includes("left") ? "12px" : "auto",
                      right: pos.includes("right") ? "12px" : "auto",
                      width: "18px",
                      height: "18px",
                      borderColor: "#D4AF37",
                      borderStyle: "solid",
                      borderWidth: `${pos.includes("top") ? "2px" : "0"} ${
                        pos.includes("right") ? "2px" : "0"
                      } ${pos.includes("bottom") ? "2px" : "0"} ${
                        pos.includes("left") ? "2px" : "0"
                      }`,
                    }}
                  />
                ),
              )}

              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "11px",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "#D4AF37",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                ✦ Royal Wedding Invitation ✦
              </motion.span>

              <h2
                className="animated-gold-text"
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: "66px",
                  margin: "0 0 10px 0",
                  fontWeight: "normal",
                  lineHeight: 1.1,
                }}
              >
                Ahmad & Hania
              </h2>

              <p
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: "#B3A594",
                  textTransform: "uppercase",
                  marginBottom: "40px",
                }}
              >
                DECEMBER 28, 2025 • LAHORE
              </p>

              <button
                onClick={handleOpenEnvelope}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "14px",
                  outline: "none",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(107, 20, 20, 0.6)",
                      "0 0 35px rgba(212, 175, 55, 0.6)",
                      "0 0 20px rgba(107, 20, 20, 0.6)",
                    ],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "78px",
                    height: "78px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 35% 35%, #8B1818 0%, #4A0808 85%)",
                    border: "2px solid #E6CA65",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Marcellus', serif",
                      color: "#FFF5DF",
                      fontSize: "24px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                    }}
                  >
                    AH
                  </span>
                </motion.div>
                <span
                  style={{
                    fontFamily: "'Marcellus', serif",
                    fontSize: "11px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#D4AF37",
                  }}
                >
                  🎵 Tap to Open & Play Music
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 2. THE BESPOKE WEDDING CARD ================= */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "100%",
            maxWidth: "620px",
            backgroundColor: "#FAF7EE",
            borderRadius: "6px",
            boxShadow:
              "0 30px 100px rgba(0,0,0,0.85), inset 0 0 80px rgba(212, 175, 55, 0.12)",
            padding: "54px 32px",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            border: "1px solid rgba(212, 175, 55, 0.45)",
          }}
        >
          {/* Borders */}
          <div
            style={{
              position: "absolute",
              inset: "10px",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              pointerEvents: "none",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "15px",
              border: "1px dashed rgba(170, 124, 17, 0.25)",
              pointerEvents: "none",
              borderRadius: "3px",
            }}
          />

          <main
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Arabic Bismillah */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="animated-gold-text"
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "30px",
                marginBottom: "16px",
                lineHeight: 1.2,
                fontWeight: 700,
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.div>

            <span
              style={{
                fontFamily: "'Marcellus', serif",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#7D6B5D",
                marginBottom: "18px",
              }}
            >
              In the name of Allah, Most Gracious, Most Merciful
            </span>

            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              style={{
                margin: "10px 0 15px 0",
                animation: "floatSlow 6s ease-in-out infinite",
              }}
            >
              <h1
                className="animated-gold-text"
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: "clamp(64px, 14vw, 88px)",
                  margin: 0,
                  lineHeight: 1.05,
                  fontWeight: "normal",
                  filter: "drop-shadow(0 2px 8px rgba(170,124,17,0.15))",
                }}
              >
                Ahmad Raza
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  margin: "8px 0",
                }}
              >
                <span
                  style={{
                    width: "48px",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #AA7C11)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "20px",
                    color: "#800020",
                  }}
                >
                  weds
                </span>
                <span
                  style={{
                    width: "48px",
                    height: "1px",
                    background: "linear-gradient(90deg, #AA7C11, transparent)",
                  }}
                />
              </div>

              <h1
                className="animated-gold-text"
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: "clamp(64px, 14vw, 88px)",
                  margin: 0,
                  lineHeight: 1.05,
                  fontWeight: "normal",
                  filter: "drop-shadow(0 2px 8px rgba(170,124,17,0.15))",
                }}
              >
                Hania Tariq
              </h1>
            </motion.div>

            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "14px",
                color: "#5C5047",
                maxWidth: "460px",
                lineHeight: 1.8,
                margin: "0 0 20px 0",
              }}
            >
              Cordially request the honor of your gracious presence to celebrate
              the blessed union and eternal love of their wedding
            </p>

            {/* 👇 SCROLL TO SEE INDICATOR 👇 */}
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                margin: "10px 0 35px 0",
                cursor: "pointer",
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
            >
              <span
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#AA7C11",
                }}
              >
                Scroll to See Event Details
              </span>
              <ChevronDown size={18} color="#AA7C11" />
            </motion.div>

            {/* ================= 3. ARCH EVENT DETAILS CARD ================= */}
            <motion.section
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              style={{
                width: "100%",
                background: "linear-gradient(180deg, #F5EFE3 0%, #EFE7D8 100%)",
                border: "1px solid #DFD2BC",
                borderRadius: "170px 170px 8px 8px",
                padding: "65px 24px 35px 24px",
                boxSizing: "border-box",
                marginBottom: "32px",
                position: "relative",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "10px",
                  letterSpacing: "0.45em",
                  color: "#AA7C11",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                The Wedding Ceremony
              </span>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "27px",
                  letterSpacing: "0.08em",
                  color: "#1F1A17",
                  textTransform: "uppercase",
                  margin: "0 0 25px 0",
                  fontWeight: 600,
                }}
              >
                Barat & Reception
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  color: "#382E27",
                  fontFamily: "'Marcellus', serif",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Calendar size={17} color="#AA7C11" />
                  <span>Sunday, 28 Dec 2025</span>
                </div>
                <span style={{ color: "#AA7C11" }}>•</span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Clock size={17} color="#AA7C11" />
                  <span>07:30 PM Sharp</span>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(212, 175, 55, 0.4)",
                  paddingTop: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "#800020",
                    marginBottom: "6px",
                  }}
                >
                  <MapPin size={17} />
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    Royal Palm Golf & Country Club
                  </h4>
                </div>

                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "13px",
                    color: "#6E6259",
                    margin: "0 0 24px 0",
                  }}
                >
                  Bab-e-Azam Grand Marquee, 52 Canal Bank Road, Lahore
                </p>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background:
                      "linear-gradient(135deg, #241D19 0%, #100C0A 100%)",
                    color: "#FAF7EE",
                    fontFamily: "'Marcellus', serif",
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    padding: "14px 30px",
                    textDecoration: "none",
                    borderRadius: "3px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
                    border: "1px solid #D4AF37",
                  }}
                >
                  <Navigation size={14} color="#D4AF37" />
                  Open Venue in Google Maps
                </motion.a>
              </div>
            </motion.section>

            {/* ================= 4. COUNTDOWN ================= */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ width: "100%", margin: "10px 0 35px 0" }}
            >
              <span
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "10px",
                  letterSpacing: "0.4em",
                  color: "#AA7C11",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "18px",
                }}
              >
                Counting Every Blessed Moment
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  maxWidth: "380px",
                  margin: "0 auto",
                }}
              >
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.minutes },
                  { label: "Secs", val: timeLeft.seconds },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    style={{
                      flex: 1,
                      backgroundColor: "#F4EEE2",
                      border: "1px solid #D9CBBA",
                      padding: "14px 6px",
                      borderRadius: "4px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    <span
                      className="animated-gold-text"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "26px",
                        fontWeight: 700,
                        display: "block",
                      }}
                    >
                      {String(item.val).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Marcellus', serif",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#736458",
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ================= 5. RSVP & AUTO-UNLOCK GIFT SECTION ================= */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              style={{
                width: "100%",
                backgroundColor: "#F5EFE4",
                border: "1px solid #DFD5C6",
                padding: "36px 24px",
                boxSizing: "border-box",
                borderRadius: "6px",
                marginBottom: "35px",
                boxShadow: "0 6px 25px rgba(0,0,0,0.03)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "10px",
                  letterSpacing: "0.4em",
                  color: "#AA7C11",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Honour Us With Your Grace
              </span>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "24px",
                  letterSpacing: "0.15em",
                  color: "#1F1A17",
                  textTransform: "uppercase",
                  margin: "0 0 25px 0",
                  fontWeight: 600,
                }}
              >
                RSVP
              </h3>

              {!isSubmitted ? (
                <form
                  onSubmit={handleRSVP}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    maxWidth: "340px",
                    margin: "0 auto",
                  }}
                >
                  <input
                    type="text"
                    required
                    placeholder="ENTER YOUR FULL NAME"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FAF7EE",
                      border: "1px solid #CFBEA9",
                      padding: "13px 15px",
                      fontFamily: "'Marcellus', serif",
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      color: "#211A16",
                      boxSizing: "border-box",
                      outline: "none",
                      borderRadius: "2px",
                    }}
                  />

                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FAF7EE",
                      border: "1px solid #CFBEA9",
                      padding: "13px 15px",
                      fontFamily: "'Marcellus', serif",
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      color: "#211A16",
                      boxSizing: "border-box",
                      outline: "none",
                      cursor: "pointer",
                      borderRadius: "2px",
                    }}
                  >
                    <option value="1">1 GUEST</option>
                    <option value="2">2 GUESTS</option>
                    <option value="3">3 GUESTS</option>
                    <option value="Family">FULL FAMILY</option>
                  </select>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    style={{
                      width: "100%",
                      background:
                        "linear-gradient(135deg, #8B0021 0%, #5E0017 100%)",
                      color: "#FFFFFF",
                      fontFamily: "'Marcellus', serif",
                      fontSize: "11px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      padding: "15px",
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                      cursor: "pointer",
                      borderRadius: "2px",
                      boxShadow: "0 6px 20px rgba(139, 0, 33, 0.35)",
                    }}
                  >
                    Confirm Attendance & Claim Gift
                  </motion.button>
                </form>
              ) : (
                /* 🎁 فارم سبمٹ ہونے پر خودکار کھلنے والا خصوصی تحفہ کارڈ 🎁 */
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    background:
                      "linear-gradient(145deg, #1C1714 0%, #2A1F1B 100%)",
                    border: "1.5px solid #D4AF37",
                    borderRadius: "8px",
                    padding: "35px 22px",
                    color: "#FAF7EE",
                    boxShadow:
                      "0 20px 50px rgba(0,0,0,0.5), inset 0 0 25px rgba(212,175,55,0.15)",
                    position: "relative",
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      repeatDelay: 1,
                    }}
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 35% 35%, #8B0021 0%, #4D0012 90%)",
                      border: "2px solid #E6CA65",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px auto",
                      boxShadow: "0 0 25px rgba(212, 175, 55, 0.5)",
                    }}
                  >
                    <Gift size={32} color="#FFE8A3" />
                  </motion.div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      color: "#D4AF37",
                      marginBottom: "6px",
                    }}
                  >
                    <Sparkle size={14} />
                    <span
                      style={{
                        fontFamily: "'Marcellus', serif",
                        fontSize: "11px",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                      }}
                    >
                      A Special Gift For You
                    </span>
                    <Sparkle size={14} />
                  </div>

                  {/* 🌟 مہمان کا نام یہاں چمکے گا 🌟 */}
                  <h3
                    className="animated-gold-text"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      textTransform: "capitalize",
                      margin: "8px 0 14px 0",
                      fontWeight: 700,
                    }}
                  >
                    Mohtaram {guestName} Sahab!
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Alex Brush', cursive",
                      fontSize: "36px",
                      color: "#FFE8A3",
                      margin: "0 0 12px 0",
                      lineHeight: 1.1,
                    }}
                  >
                    "آپ کی تشریف آوری ہمارا اصل تحفہ ہے"
                  </p>

                  <div
                    style={{
                      width: "60px",
                      height: "1px",
                      backgroundColor: "#D4AF37",
                      margin: "0 auto 16px auto",
                    }}
                  />

                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "13.5px",
                      color: "#E2D9CC",
                      lineHeight: 1.8,
                      maxWidth: "430px",
                      margin: "0 auto",
                    }}
                  >
                    خلوص اور دعاؤں کا بہت شکریہ۔ آپ کے تشریف لانے کے اقرار نے
                    ہماری خوشیوں کو چار چاند لگا دیئے ہیں۔ احمد اور ہانیہ اپنی
                    فیملی سمیت دل کی اتھاہ گہرائیوں سے آپ کا استقبال کرنے کے
                    منتظر ہیں۔
                  </p>

                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "18px",
                      padding: "6px 16px",
                      borderRadius: "50px",
                      backgroundColor: "rgba(212, 175, 55, 0.15)",
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                      color: "#D4AF37",
                      fontFamily: "'Marcellus', serif",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    ✓ Reserved for{" "}
                    {guestCount === "Family"
                      ? "Full Family"
                      : `${guestCount} Guest(s)`}
                  </span>
                </motion.div>
              )}
            </motion.section>

            {/* Footer with Floating Heart */}
            <footer style={{ marginTop: "10px", textAlign: "center" }}>
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart
                  size={18}
                  color="#AA7C11"
                  fill="#AA7C11"
                  style={{ margin: "0 auto 8px auto" }}
                />
              </motion.div>

              <p
                className="animated-gold-text"
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: "42px",
                  margin: 0,
                  fontWeight: "normal",
                }}
              >
                With Warm Duas
              </p>
              <p
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "10px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#8C7A6B",
                  marginTop: "4px",
                }}
              >
                The Families of Ahmad & Hania
              </p>
            </footer>
          </main>
        </motion.div>
      )}
    </div>
  );
}

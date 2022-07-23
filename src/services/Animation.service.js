import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { isMobile } from "@/utils";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
  
const gsapTimeline = gsap.timeline();

function _to(el, options) {
  if (isMobile?.() && options.runInMobile === false) return;
  if (!isMobile?.() && options.runInDesktop === false) return;
  gsapTimeline.to(el, options.gsapOptions);
  gsapTimeline.progress(1).progress(0);
}

function _from(el, options) {
  if (isMobile?.() && options.runInMobile === false) return;
  if (!isMobile?.() && options.runInDesktop === false) return;
  gsapTimeline.from(el, options.gsapOptions);
  gsapTimeline.progress(1).progress(0);
}

// helpers

function _vh(coef) {
  return window.innerHeight * (coef / 100);
}

function _vw(coef) {
  return window.innerWidth * (coef / 100);
}

let isScrollSet = false;

function _setSmoothScroll() {
  const LINKS_SELECTOR = "nav a";
  const links = document.querySelectorAll(LINKS_SELECTOR);
  links.forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();
      const target = e?.currentTarget?.getAttribute("href");
      const scrollTo =
        target && document.querySelector(target).offsetTop;

      const gsapOptions = {
        duration: 1.5,
        scrollTo: scrollTo,
        ease: "power2.inOut",
      };

      gsap.to(window, gsapOptions);
    };
  });
  isScrollSet = true;
}

export default {
  timeline: {
    to: _to.bind(this),
    from: _from.bind(this),
  },

  helpers: {
    vh: _vh,
    vw: _vw,
  },

  setSmoothScroll() {
    !isScrollSet && _setSmoothScroll();
  }
}

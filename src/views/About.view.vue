<template>
  <section class="AboutView View" id="about">
    <h1 class="AboutView-title">Nosotros</h1>
    <p class="AboutView-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    <p class="AboutView-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
    <img class="AboutView-image" src="@/assets/images/long-arm.svg" alt="Lodetto" />
  </section>
</template>
<script>
import AS from "@/services/Animation.service";

export default {
  name: "AboutView",

  mounted() {
    this.setIntroImageTransition();
    this.setOutroTitleTransition();
    this.setOutroTextTransition();
    this.setOutroImageTransition();
  },

  methods: {
    setIntroImageTransition() {
      const TARGET_SEL = ".AboutView-image";
      const TRIGGER_ELEMENT_SEL = "#about";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "75% bottom",
            end: "bottom bottom",
          },
          x: -AS.helpers.vw(100),
        },
      };

      AS.timeline.from(TARGET_SEL, animationOptions);
    },

    setOutroTitleTransition() {
      const TARGET_SEL = ".AboutView-title";
      const TRIGGER_ELEMENT_SEL = "#contact";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "bottom bottom",
          },
          y: -AS.helpers.vh(30),
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },

    setOutroTextTransition() {
      const TARGET_SEL = ".AboutView-text";
      const TRIGGER_ELEMENT_SEL = "#contact";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "bottom bottom",
          },
          y: -AS.helpers.vh(50),
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },

    setOutroImageTransition() {
      const TARGET_SEL = ".AboutView-image";
      const TRIGGER_ELEMENT_SEL = "#contact";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "bottom bottom",
          },
          y: AS.helpers.vh(40),
          scale: 2.5,
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },
  }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/breakpoints.scss";

.AboutView {
  &-image {
    display: block;
    margin: auto;
    width: 70%;
  }
}
</style>

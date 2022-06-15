<template>
  <section class="HomeView View" id="home">
    <div class="HomeView-main">
      <div class="HomeView-mainInner">
        <div>
          <h1 class="HomeView-title">
            <a href="#home">
              <img class="HomeView-logo" src="@/assets/images/logo.svg" alt="Lodetto" />
            </a>
          </h1>
          <h2 class="HomeView-subtitle">
            <span>Cafe</span>
            <span>para</span>
            <span class="HomeView-subtitleAnimated">{{ currentText }}</span>
          </h2>
        </div>
        <div class="HomeView-mainImageContainer">
          <img class="HomeView-mainImage" src="@/assets/images/smell-coffee.svg" alt="Cafe Lodetto" />
        </div>
      </div>
    </div>
    <nav class="HomeView-nav">
      <a href="#menu">Menu</a>
      <a href="#about">Nosotros</a>
      <a href="#contact">Contacto</a>
    </nav>
    <img src="@/assets/images/yawn.svg" alt="Café para empezar"  class="HomeView-secondaryImage"/>
  </section>
</template>
<script>
import AS from "@/services/Animation.service";

const SUBTITLE_WORDS = [
  "llevar",
  "disfrutar",
  "empezar",
  "compartir",
]

export default {
  name: "HomeView",

  data() {
    return {
      counter: 0,
      currentText: SUBTITLE_WORDS[0]
    }
  },
  
  mounted() {
    window.addEventListener("load", () => {
      this.startSubtitleAnimation();
    });

    this.setLogoTransition();
    this.setSubtitleTransition();
    this.setImageTransition();
    this.setMenuTransition();
    this.setSecondaryImageTransition();
  },

  methods: {
    startSubtitleAnimation() {
      const TARGET_SEL = ".HomeView-subtitleAnimated";
      let i = 0;

      const fromOptions = {
        runInMobile: true,
        gsapOptions: {
          delay: "0.5",
          left: 0 - AS.helpers.vw(15),
          opacity: 0,
          ease: "power4",
          repeat: -1,
          yoyo: true,
          repeatDelay: 1,
          duration: 0.2,
          onRepeat: () => {
            if(i%2 === 0) {
              console.log('repeat');
              this.counter = this.counter === SUBTITLE_WORDS.length - 1 ? 0 : this.counter + 1;
              this.currentText = SUBTITLE_WORDS[this.counter];
            }
            i++;
          },
         
        },
      };

      AS.timeline.from(TARGET_SEL, fromOptions);

    },

    setLogoTransition() {
      const TARGET_SEL = ".HomeView-logo";
      const TRIGGER_ELEMENT_SEL = "#menu";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "bottom bottom",
          },
          y: AS.helpers.vh(35),
          x: AS.helpers.vw(35),
          scale: 4,
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },

    setSubtitleTransition() {
      const TARGET_SEL = ".HomeView-subtitle";
      const TRIGGER_ELEMENT_SEL = "#menu";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "top center",
          },
          x: -AS.helpers.vw(100),
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },

    setImageTransition() {
      const TARGET_SEL = ".HomeView-mainImage";
      const TRIGGER_ELEMENT_SEL = "#menu";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "bottom bottom",
          },
          x: AS.helpers.vw(150),
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },

    setMenuTransition() {
      const TARGET_SEL = ".HomeView-nav";
      const TRIGGER_ELEMENT_SEL = "#menu";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "top center",
          },
          y: AS.helpers.vh(40),
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },

    setSecondaryImageTransition() {
      const TARGET_SEL = ".HomeView-secondaryImage";
      const TRIGGER_ELEMENT_SEL = "#menu";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "bottom bottom",
          },
          y: AS.helpers.vh(50),
        },
      };

      AS.timeline.from(TARGET_SEL, animationOptions);
    },
  }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/breakpoints.scss";

$animatedElHeight: 84px;
$animatedElHeightXxs: 60px;

.HomeView {
  background-color: $primary;
  display: flex;
  flex-direction: column;
  position: relative;

  &-logo {
    width: 100px;
  }

  &-main {
    display: flex;
    flex: 1;
  }

  &-mainInner {
    margin: auto 0;
    display: flex;
  }

  &-title {
    margin: 0;
  }

  &-subtitle {
    font-size: 7rem;
    line-height: 0.75;
    margin: 0;
    padding-bottom: $animatedElHeight; // animated element height
    position: relative;

    @include xxs {
      font-size: 5rem;
      padding-bottom: $animatedElHeightXxs; // animated element height
    }
    
    span {
      display: block;
    }
  }

  &-subtitleAnimated {
    position: absolute;
  }

  &-mainImageContainer {
    display: flex;
    padding-bottom: $animatedElHeight;
    
    @include xxs {
      padding-bottom: $animatedElHeightXxs; // animated element height
    }
  }

  &-mainImage {
    margin: auto;
    width: 100%;
    max-width: 200px;
  }

  &-secondaryImage {
    bottom: 0;
    left: 0;
    margin-left: calc(50vw - 35vw / 2);
    width: 35vw;
    position: absolute;
  }

  &-nav {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    justify-content: space-between;
  }
}
</style>

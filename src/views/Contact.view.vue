<template>
  <section class="ContactView View" id="contact">
    <div class="View-overlay" :class="isOpen ? `open-${direction}` : ''" @click="openSection('up')">
      <h2 class="View-overlayTitle">Contact</h2>  
      <img class="View-overlayImage" src="@/assets/images/tazon_primary.svg" alt="Lodetto eyes"/>
    </div> 
    <h1>Contact</h1>
    <p>Encontranos en nuestra tienda: <strong>Carrer de Valldonzella 36, Barcelona</strong> (<a class="ContactView-link" href="https://goo.gl/maps/1agyCp43aMDZn2mSA" target="_blank">Ver mapa</a>).</p>
    <p>Horarios: <strong>Lunes a Sabado de 8 a 18hs</strong>.</p>
    <ul>
      <li>t. <a class="ContactView-link" target="_blank" :href="`tel:+${tel}`">+34 607 48 70 77</a></li>
      <li>w. <a class="ContactView-link" target="_blank" :href="getWhatsappLink">+34 607 48 70 77</a></li>
      <!-- <li>e. <a class="ContactView-link" href="mailto:hola@lodetto.cafe">hola@lodetto.cafe</a></li> -->
      <li>
        <a href="https://www.instagram.com/lodettocafe" class="ContactView-socialButton" target="_blank">
          <span>
            <img class="ContactView-icon" src="@/assets/images/instagram_secondary.svg" alt="Instagram" />
            Seguinos en instagram
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>
<script>
import AS from "@/services/Animation.service";
import Overlay from "@/mixins/Overlay.mixin";
import { isMobile } from "@/utils";

export default {
  name: "ContactView",

  mixins: [Overlay],

  data() {
    return {
      sectionName: 'contact',
      tel: '34607487077',
    }
  },

  computed: {
    getWhatsappLink() {
      return isMobile()
        ? `https://wa.me/+${this.tel}`
        : `https://web.whatsapp.com/send/?phone=%2B${this.tel}&text&app_absent=0`;
    }
  },

  mounted() {
    this.setIntroImageTransition();
  },

  methods: {
    setIntroImageTransition() {
      const TARGET_SEL = ".ContactView";
      const TRIGGER_ELEMENT_SEL = "#contact";
      const animationOptions = {
        runInMobile: true,
        runInDesktop: false,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "75% bottom",
            end: "bottom bottom",
          },
          backgroundPositionX: -AS.helpers.vw(100),
        },
      };

      AS.timeline.from(TARGET_SEL, animationOptions);
    }
  }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/breakpoints.scss";

$angle: -20deg;

.ContactView {
  background: $secondary;
  background-image: url("@/assets/images/ride-cup_primary.svg");
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 75vh;
  background-size: 90vw;
  color: $primary;

  @include desktop-up {
    background-size: 75%;
  }
  
  &-link {
    color: $primary;
  }

  &-socialButton {
    color: $secondary;
    display: inline-block;
    font-family: "Bad Brush";
    font-size: 20px;
    margin: $gap 0;
    padding: 5px 10px;
    position: relative;
    text-decoration: none;
    z-index: 1;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: $primary;
      z-index: -1;
      -webkit-transform: skewX($angle);
      -moz-transform: skewX($angle);
      transform: skewX($angle);
    }

    span {
      display: flex;
      align-items: center;
    }
  }

  &-icon {
    width: 20px;
    margin-right: 5px;
  }

  .View-overlay {
    background: $secondary;
  }

  .View-overlayImage {
    max-width: 90%;
    max-height: 55%;
  }
}
</style>

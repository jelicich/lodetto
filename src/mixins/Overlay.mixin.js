import { bus } from '../main';

export default {
  name: 'Overlay',

  data() {
    return {
      sectionName: '', // override
      isOpen: false,
      direction: 'up',
    }
  },

  created() {
    bus.$on('close', (sectionName) => {
      this.isOpen = sectionName !== this.sectionName 
        ? false
        : this.isOpen;
    })
  },

  methods: {
    openSection(direction) {
      this.isOpen = true;
      this.direction = direction;
      bus.$emit('close', this.sectionName);
    }
  }
}
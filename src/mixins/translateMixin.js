export default {
  methods: {
    translateProp(row, prop) {
      let text = '';
      try {
        if (this.translate[prop] && typeof this.translate[prop] === 'object') {
          text = this.translate[prop][row[prop]] || row[prop];
        } else {
          text = row[prop];
        }
      } catch (error) {
        text = row[prop];
      }
      return text || '--';
    }
  }
};

import 'wc';
import 'polyHTML!html';
import 'bio-element.html!html';

class BioElement {
  constructor() {
    Polymer(BioElement.prototype);
  }

  get is() {
    return 'bio-element';
  }

  get properties() {
    return {
      text: {
        type: String,
        value: 'Hello'
      }
    };
  }

  created() {
    console.log('bio-element created');
  }
}

export var bioElement = new BioElement();

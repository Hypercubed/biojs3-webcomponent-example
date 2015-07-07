System.import('../../d3/d3.min.js').then(function() {
  new BioJSComponent();
});

class BioJSComponent {
  constructor() {
    Polymer(BioJSComponent.prototype);
  }

  // Component Name
  get is() {
    return 'biojs-component';
  }

  // Component Properties
  get properties() {
    return {
      /**
      * Sets the url where to fetch the data
      *
      * @type {String}
      */
      url: {
        type: String
      },

      /**
      * Sets the margins of the graph
      *
      * @type {top: Number, right: Number, bottom: Number, left: Number}
      */
      margin: {
        type: Object,
        value: () => ({
          top: 20, right: 20, bottom: 30, left: 40
        })
      },

      /**
      * Sets the width of the graph
      *
      * @type {Number}
      */
      width: {
        type: Number,
        value: 960
      },

      /**
      * Sets the height of the graph
      * @type {Number}
      */
      height: {
        type: Number,
        value: 500
      }
    }
  }

  // Component Lifecycle
  ready() {
    this._draw();
  }
  // Component Behavior

  /** Main function that draws the graph */
  _draw() {
    // Bar chart example from Mike Bostock
    // http://bl.ocks.org/mbostock/3885304
    let margin = this.margin;
    let width = this.width - margin.left - margin.right;
    let height = this.height - margin.top - margin.bottom;

    let x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    let y = d3.scale.linear()
        .range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    let yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(10, '%');

    let svg = d3.select(this).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.tsv(this.url, type, function(error, data) {
      if (error) { throw error };

      x.domain(data.map(function(d) { return d.letter; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

      svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Frequency');

      svg.selectAll('.bar')
          .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x(d.letter); })
          .attr('width', x.rangeBand())
          .attr('y', function(d) { return y(d.frequency); })
          .attr('height', function(d) { return height - y(d.frequency); });
    });

    function type(d) {
      d.frequency = +d.frequency;
      return d;
    }
  }
}

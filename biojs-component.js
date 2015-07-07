Polymer({
  // Component Name
  is: 'biojs-component',

  // Component Properties
  properties: {
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
      value: function() {
        return {top: 20, right: 20, bottom: 30, left: 40}
      }
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
  },

  // Component Lifecycle
  ready: function() {
    this._draw();
  },

  // Component Behavior

  /** Main function that draws the graph */
  _draw: function () {
    // Bar chart example from Mike Bostock
    // http://bl.ocks.org/mbostock/3885304
    var margin = this.margin;
    var width = this.width - margin.left - margin.right;
    var height = this.height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(10, '%');

    var svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    Polymer.dom(this.root).appendChild(svgEl);

    var svg = d3.select('svg')
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

});

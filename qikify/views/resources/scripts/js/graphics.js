// Generated by CoffeeScript 1.3.1
var BarChart, Chart, HLineChart, LineChart,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Chart = (function(_super) {

  __extends(Chart, _super);

  Chart.name = 'Chart';

  function Chart(name, description, chart_id) {
    this.name = name;
    this.description = description;
    this.chart_id = chart_id;
    Chart.__super__.constructor.apply(this, arguments);
    console.log(window.today + (" *** Chart() - " + this.name + " " + this.id));
    this.canvas = Raphael($("#" + this.chart_id)[0], 600, 80);
  }

  return Chart;

})(DOMInteractions);

BarChart = (function(_super) {

  __extends(BarChart, _super);

  BarChart.name = 'BarChart';

  function BarChart() {
    this.plot = __bind(this.plot, this);
    return BarChart.__super__.constructor.apply(this, arguments);
  }

  BarChart.prototype.plot = function(data) {
    return this.canvas.barchart(0, 0, 640, 180, [data.x], 0, {
      type: "square"
    });
  };

  return BarChart;

})(Chart);

LineChart = (function(_super) {

  __extends(LineChart, _super);

  LineChart.name = 'LineChart';

  function LineChart(name, description, parentID) {
    this.name = name;
    this.description = description;
    this.parentID = parentID;
    this.update = __bind(this.update, this);

    this.plot = __bind(this.plot, this);

    LineChart.__super__.constructor.call(this, this.name, this.description, this.parentID);
    this.data = {
      "x": [],
      "y": []
    };
    this.recv_msg_count = 0;
  }

  LineChart.prototype.plot = function() {
    this.canvas.clear();
    return this.chart = this.canvas.linechart(0, 0, 600, 80, this.data.x, this.data.y);
  };

  LineChart.prototype.update = function(yval) {
    var _i, _ref, _results;
    this.data.x = (function() {
      _results = [];
      for (var _i = 0, _ref = this.recv_msg_count; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this);
    this.data.y.push(yval);
    this.recv_msg_count += 1;
    if (this.recv_msg_count > 1) {
      return this.plot();
    }
  };

  return LineChart;

})(Chart);

HLineChart = (function() {

  HLineChart.name = 'HLineChart';

  function HLineChart(parentID) {
    var _this = this;
    this.parentID = parentID;
    console.log(window.today + " *** HLineChart()");
    this.data = [
      {
        name: '',
        data: (function() {
          var data, i, _i;
          data = [];
          for (i = _i = -19; _i <= 0; i = ++_i) {
            data.push({
              x: (new Date()).getTime() + i * 1000,
              y: 0
            });
          }
          return data;
        })()
      }
    ];
    this.chart = new Highcharts.Chart({
      chart: {
        renderTo: this.parentID,
        type: 'line'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: ''
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080'
          }
        ]
      },
      series: this.data
    });
  }

  HLineChart.prototype.update = function(y) {
    var x;
    console.log(window.today + " *** HLineChart().update()");
    x = (new Date()).getTime();
    console.log(x, Number(y));
    return this.chart.series[0].addPoint([x, Number(y)], true, true);
  };

  return HLineChart;

})();

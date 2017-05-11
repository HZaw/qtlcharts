// Generated by CoffeeScript 1.12.5
var scat2scat;

scat2scat = function(widgetdiv, scat1data, scat2data, chartOpts) {
  var axispos, chartdivid, g_left, g_right, height, leftchart, make_right_chart, margin, nxticks1, nxticks2, nyticks1, nyticks2, pointcolor1, pointcolor2, pointsize1, pointsize2, pointstroke1, pointstroke2, rectcolor, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref26, ref27, ref28, ref29, ref3, ref30, ref31, ref32, ref33, ref4, ref5, ref6, ref7, ref8, ref9, rightchart, rotate_ylab1, rotate_ylab2, svg, title1, titlepos, widgetdivid, width, xNA, xlab1, xlab2, xlim1, xlim2, xticks1, xticks2, yNA, ylab1, ylab2, ylim1, ylim2, yticks1, yticks2;
  height = (ref = chartOpts != null ? chartOpts.height : void 0) != null ? ref : 500;
  width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : 800;
  title1 = (ref2 = chartOpts != null ? chartOpts.title1 : void 0) != null ? ref2 : "";
  margin = (ref3 = chartOpts != null ? chartOpts.margin : void 0) != null ? ref3 : {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = (ref4 = chartOpts != null ? chartOpts.axispos : void 0) != null ? ref4 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = (ref5 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? ref5 : 20;
  xlab1 = (ref6 = chartOpts != null ? chartOpts.xlab1 : void 0) != null ? ref6 : "X";
  ylab1 = (ref7 = chartOpts != null ? chartOpts.ylab1 : void 0) != null ? ref7 : "Y";
  xlab2 = (ref8 = chartOpts != null ? chartOpts.xlab2 : void 0) != null ? ref8 : "X";
  ylab2 = (ref9 = chartOpts != null ? chartOpts.ylab2 : void 0) != null ? ref9 : "Y";
  xlim1 = (ref10 = chartOpts != null ? chartOpts.xlim1 : void 0) != null ? ref10 : null;
  xticks1 = (ref11 = chartOpts != null ? chartOpts.xticks1 : void 0) != null ? ref11 : null;
  nxticks1 = (ref12 = chartOpts != null ? chartOpts.nxticks1 : void 0) != null ? ref12 : 5;
  ylim1 = (ref13 = chartOpts != null ? chartOpts.ylim1 : void 0) != null ? ref13 : null;
  yticks1 = (ref14 = chartOpts != null ? chartOpts.yticks1 : void 0) != null ? ref14 : null;
  nyticks1 = (ref15 = chartOpts != null ? chartOpts.nyticks1 : void 0) != null ? ref15 : 5;
  xlim2 = (ref16 = chartOpts != null ? chartOpts.xlim2 : void 0) != null ? ref16 : null;
  xticks2 = (ref17 = chartOpts != null ? chartOpts.xticks2 : void 0) != null ? ref17 : null;
  nxticks2 = (ref18 = chartOpts != null ? chartOpts.nxticks2 : void 0) != null ? ref18 : 5;
  ylim2 = (ref19 = chartOpts != null ? chartOpts.ylim2 : void 0) != null ? ref19 : null;
  yticks2 = (ref20 = chartOpts != null ? chartOpts.yticks2 : void 0) != null ? ref20 : null;
  nyticks2 = (ref21 = chartOpts != null ? chartOpts.nyticks2 : void 0) != null ? ref21 : 5;
  rectcolor = (ref22 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? ref22 : "#E6E6E6";
  pointcolor1 = (ref23 = chartOpts != null ? chartOpts.pointcolor1 : void 0) != null ? ref23 : null;
  pointsize1 = (ref24 = chartOpts != null ? chartOpts.pointsize1 : void 0) != null ? ref24 : 3;
  pointstroke1 = (ref25 = chartOpts != null ? chartOpts.pointstroke1 : void 0) != null ? ref25 : "black";
  pointcolor2 = (ref26 = chartOpts != null ? chartOpts.pointcolor2 : void 0) != null ? ref26 : null;
  pointsize2 = (ref27 = chartOpts != null ? chartOpts.pointsize2 : void 0) != null ? ref27 : 3;
  pointstroke2 = (ref28 = chartOpts != null ? chartOpts.pointstroke2 : void 0) != null ? ref28 : "black";
  rotate_ylab1 = (ref29 = chartOpts != null ? chartOpts.rotate_ylab1 : void 0) != null ? ref29 : null;
  rotate_ylab2 = (ref30 = chartOpts != null ? chartOpts.rotate_ylab2 : void 0) != null ? ref30 : null;
  xNA = (ref31 = chartOpts != null ? chartOpts.xNA : void 0) != null ? ref31 : {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  yNA = (ref32 = chartOpts != null ? chartOpts.yNA : void 0) != null ? ref32 : {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  chartdivid = (ref33 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref33 : 'chart';
  widgetdivid = d3.select(widgetdiv).attr('id');
  leftchart = d3panels.scatterplot({
    height: height,
    width: width / 2,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    xlab: xlab1,
    ylab: ylab1,
    title: title1,
    ylim: ylim1,
    xlim: xlim1,
    xticks: xticks1,
    nxticks: nxticks1,
    yticks: yticks1,
    nyticks: nyticks1,
    rectcolor: rectcolor,
    pointcolor: pointcolor1,
    pointsize: pointsize1,
    pointstroke: pointstroke1,
    rotate_ylab: rotate_ylab1,
    xNA: {
      handle: xNA.handle,
      force: xNA.force
    },
    xNA_size: {
      width: xNA.width,
      gap: xNA.gap
    },
    yNA: {
      handle: yNA.handle,
      force: yNA.force
    },
    yNA_size: {
      width: yNA.width,
      gap: yNA.gap
    },
    tipclass: widgetdivid
  });
  svg = d3.select(widgetdiv).select("svg");
  g_left = svg.append("g").attr("id", "scat1");
  leftchart(g_left, scat1data);
  leftchart.points().on("mouseover", function(d) {
    return d3.select(this).attr("r", pointsize1 * 2);
  }).on("mouseout", function(d) {
    return d3.select(this).attr("r", pointsize1);
  }).on("click", function(d, i) {
    if (typeof rightchart !== "undefined" && rightchart !== null) {
      rightchart.remove();
    }
    return make_right_chart(i);
  });
  rightchart = null;
  g_right = svg.append("g").attr("id", "scat2").attr("transform", "translate(" + (width / 2) + ",0)");
  return make_right_chart = function(index) {
    rightchart = d3panels.scatterplot({
      height: height,
      width: width / 2,
      margin: margin,
      axispos: axispos,
      titlepos: titlepos,
      xlab: xlab2,
      ylab: ylab2,
      title: scat1data.indID[index],
      ylim: ylim2,
      xlim: xlim2,
      xticks: xticks2,
      nxticks: nxticks2,
      yticks: yticks2,
      nyticks: nyticks2,
      rectcolor: rectcolor,
      pointcolor: pointcolor2,
      pointsize: pointsize2,
      pointstroke: pointstroke2,
      rotate_ylab: rotate_ylab2,
      xNA: {
        handle: xNA.handle,
        force: xNA.force
      },
      xNA_size: {
        width: xNA.width,
        gap: xNA.gap
      },
      yNA: {
        handle: yNA.handle,
        force: yNA.force
      },
      yNA_size: {
        width: yNA.width,
        gap: yNA.gap
      },
      tipclass: widgetdivid
    });
    return rightchart(g_right, scat2data[index]);
  };
};

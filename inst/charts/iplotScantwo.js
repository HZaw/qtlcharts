// Generated by CoffeeScript 1.8.0
var add_symmetric_lod, ci_data, cis, iplotScantwo, lod_for_heatmap;

cis = null;

ci_data = null;

iplotScantwo = function(scantwo_data, pheno_and_geno, chartOpts) {
  var add_cell_tooltips, axispos, bordercolor, chartdivid, chrGap, color, darkrect, div, eff_hpos, eff_vpos, form, g_eff, g_heatmap, g_scans, hbot, heatmap_height, heatmap_width, hright, left, leftsel, leftvalue, lightrect, linecolor, linewidth, margin, mychrheatmap, nullcolor, oneAtTop, options, pixelPerCell, plot_effects, plot_scan, pointcolor, pointsize, pointstroke, right, rightsel, rightvalue, scans_hpos, scans_vpos, submit, svg, totalh, totalw, totmar, w, wbot, wright, zthresh, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
  pixelPerCell = (_ref = chartOpts != null ? chartOpts.pixelPerCell : void 0) != null ? _ref : null;
  chrGap = (_ref1 = chartOpts != null ? chartOpts.chrGap : void 0) != null ? _ref1 : 2;
  wright = (_ref2 = chartOpts != null ? chartOpts.wright : void 0) != null ? _ref2 : 500;
  hbot = (_ref3 = chartOpts != null ? chartOpts.hbot : void 0) != null ? _ref3 : 200;
  margin = (_ref4 = chartOpts != null ? chartOpts.margin : void 0) != null ? _ref4 : {
    left: 60,
    top: 30,
    right: 10,
    bottom: 40,
    inner: 5
  };
  axispos = (_ref5 = chartOpts != null ? chartOpts.axispos : void 0) != null ? _ref5 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  lightrect = (_ref6 = chartOpts != null ? chartOpts.lightrect : void 0) != null ? _ref6 : "#e6e6e6";
  darkrect = (_ref7 = chartOpts != null ? chartOpts.darkrect : void 0) != null ? _ref7 : "#c8c8c8";
  nullcolor = (_ref8 = chartOpts != null ? chartOpts.nullcolor : void 0) != null ? _ref8 : "#e6e6e6";
  bordercolor = (_ref9 = chartOpts != null ? chartOpts.bordercolor : void 0) != null ? _ref9 : "black";
  linecolor = (_ref10 = chartOpts != null ? chartOpts.linecolor : void 0) != null ? _ref10 : "slateblue";
  linewidth = (_ref11 = chartOpts != null ? chartOpts.linewidth : void 0) != null ? _ref11 : 2;
  pointcolor = (_ref12 = chartOpts != null ? chartOpts.pointcolor : void 0) != null ? _ref12 : "slateblue";
  pointsize = (_ref13 = chartOpts != null ? chartOpts.pointsize : void 0) != null ? _ref13 : 3;
  pointstroke = (_ref14 = chartOpts != null ? chartOpts.pointstroke : void 0) != null ? _ref14 : "black";
  color = (_ref15 = chartOpts != null ? chartOpts.color : void 0) != null ? _ref15 : "slateblue";
  oneAtTop = (_ref16 = chartOpts != null ? chartOpts.oneAtTop : void 0) != null ? _ref16 : false;
  zthresh = (_ref17 = chartOpts != null ? chartOpts.zthresh : void 0) != null ? _ref17 : 0;
  chartdivid = (_ref18 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? _ref18 : 'chart';
  totmar = sumArray(scantwo_data.nmar);
  if (pixelPerCell == null) {
    pixelPerCell = d3.max([2, Math.floor(600 / totmar)]);
  }
  w = chrGap * scantwo_data.chrnames.length + pixelPerCell * totmar;
  heatmap_width = w + margin.left + margin.right;
  heatmap_height = w + margin.top + margin.bottom;
  hright = heatmap_height / 2 - margin.top - margin.bottom;
  totalw = heatmap_width + wright + margin.left + margin.right;
  totalh = heatmap_height + (hbot + margin.top + margin.bottom) * 2;
  wbot = totalw / 2 - margin.left - margin.right;
  leftvalue = "int";
  rightvalue = "fv1";
  options = ["full", "fv1", "int", "add", "av1"];
  div = d3.select("div#" + chartdivid);
  form = div.append("g").attr("id", "form");
  left = form.append("div").text(oneAtTop ? "bottom-left: " : "top-left: ").style("float", "left").style("margin-left", "50px");
  leftsel = left.append("select").attr("id", "leftselect").attr("name", "left");
  leftsel.selectAll("empty").data(options).enter().append("option").attr("value", function(d) {
    return d;
  }).text(function(d) {
    return d;
  }).attr("selected", function(d) {
    if (d === leftvalue) {
      return "selected";
    }
    return null;
  });
  right = form.append("div").text(oneAtTop ? "top-right: " : "bottom-right: ").style("float", "left").style("margin-left", "50px");
  rightsel = right.append("select").attr("id", "rightselect").attr("name", "right");
  rightsel.selectAll("empty").data(options).enter().append("option").attr("value", function(d) {
    return d;
  }).text(function(d) {
    return d;
  }).attr("selected", function(d) {
    if (d === rightvalue) {
      return "selected";
    }
    return null;
  });
  submit = form.append("div").style("float", "left").style("margin-left", "50px").append("button").attr("name", "refresh").text("Refresh").on("click", function() {
    leftsel = document.getElementById('leftselect');
    leftvalue = leftsel.options[leftsel.selectedIndex].value;
    rightsel = document.getElementById('rightselect');
    rightvalue = rightsel.options[rightsel.selectedIndex].value;
    scantwo_data.z = lod_for_heatmap(scantwo_data, leftvalue, rightvalue);
    d3.select("g#chrheatmap svg").remove();
    d3.select("g#chrheatmap").datum(scantwo_data).call(mychrheatmap);
    return add_cell_tooltips();
  });
  svg = d3.select("div#" + chartdivid).append("svg").attr("height", totalh).attr("width", totalw);
  scantwo_data = add_symmetric_lod(scantwo_data);
  scantwo_data.z = lod_for_heatmap(scantwo_data, leftvalue, rightvalue);
  mychrheatmap = chrheatmap().pixelPerCell(pixelPerCell).chrGap(chrGap).axispos(axispos).rectcolor("white").nullcolor(nullcolor).bordercolor(bordercolor).colors(["white", color]).zlim([0, scantwo_data.max.full]).zthresh(zthresh).oneAtTop(oneAtTop).hover(false);
  g_heatmap = svg.append("g").attr("id", "chrheatmap").datum(scantwo_data).call(mychrheatmap);
  add_cell_tooltips = function() {
    var cells, celltip;
    d3.selectAll(".d3-tip").remove();
    celltip = d3.tip().attr('class', 'd3-tip').html(function(d) {
      var leftlod, mari, marj, rightlod;
      mari = scantwo_data.labels[d.i];
      marj = scantwo_data.labels[d.j];
      if (+d.i > +d.j) {
        leftlod = d3.format(".1f")(scantwo_data[leftvalue][d.i][d.j]);
        rightlod = d3.format(".1f")(scantwo_data[rightvalue][d.j][d.i]);
        return "(" + marj + " " + mari + ") " + rightvalue + " = " + rightlod + ", " + leftvalue + " = " + leftlod;
      } else if (+d.j > +d.i) {
        leftlod = d3.format(".1f")(scantwo_data[leftvalue][d.j][d.i]);
        rightlod = d3.format(".1f")(scantwo_data[rightvalue][d.i][d.j]);
        return "(" + marj + " " + mari + ") " + leftvalue + " = " + leftlod + ", " + rightvalue + " = " + rightlod;
      } else {
        return mari;
      }
    }).direction('e').offset([0, 10]);
    svg.call(celltip);
    cells = mychrheatmap.cellSelect();
    return cells.on("mouseover", function(d) {
      return celltip.show(d);
    }).on("mouseout", function() {
      return celltip.hide();
    }).on("click", function(d) {
      var mari, marj;
      mari = scantwo_data.labels[d.i];
      marj = scantwo_data.labels[d.j];
      console.log("click! " + mari + " (" + d.i + "), " + marj + " (" + d.j + ")");
      if (d.i === d.j) {
        return null;
      }
      plot_scan(d.i, 0, 0, leftvalue);
      plot_scan(d.i, 1, 0, rightvalue);
      plot_scan(d.j, 0, 1, leftvalue);
      plot_scan(d.j, 1, 1, rightvalue);
      if (pheno_and_geno != null) {
        return plot_effects(d.i, d.j);
      }
    });
  };
  add_cell_tooltips();
  g_scans = [[null, null], [null, null]];
  scans_hpos = [0, wbot + margin.left + margin.right];
  scans_vpos = [heatmap_height, heatmap_height + hbot + margin.top + margin.bottom];
  g_eff = [null, null];
  eff_hpos = [heatmap_width, heatmap_width];
  eff_vpos = [0, heatmap_height / 2];
  plot_scan = function(markerindex, panelrow, panelcol, lod) {
    var data, mylodchart, x;
    data = {
      chrnames: scantwo_data.chrnames,
      lodnames: ["lod"],
      chr: scantwo_data.chr,
      pos: scantwo_data.pos,
      lod: (function() {
        var _i, _len, _ref19, _results;
        _ref19 = scantwo_data[lod][markerindex];
        _results = [];
        for (_i = 0, _len = _ref19.length; _i < _len; _i++) {
          x = _ref19[_i];
          _results.push(x);
        }
        return _results;
      })(),
      markernames: scantwo_data.labels
    };
    if (g_scans[panelrow][panelcol] != null) {
      g_scans[panelrow][panelcol].remove();
    }
    mylodchart = lodchart().height(hbot).width(wbot).margin(margin).axispos(axispos).ylim([0.0, scantwo_data.max[lod]]).lightrect(lightrect).darkrect(darkrect).linewidth(linewidth).linecolor(linecolor).pointsize(0).pointcolor("").pointstroke("").lodvarname("lod").xlab("").title("" + data.markernames[markerindex] + " : " + lod);
    return g_scans[panelrow][panelcol] = svg.append("g").attr("id", "scan_" + (panelrow + 1) + "_" + (panelcol + 1)).attr("transform", "translate(" + scans_hpos[panelcol] + ", " + scans_vpos[panelrow] + ")").datum(data).call(mylodchart);
  };
  return plot_effects = function(markerindex1, markerindex2) {
    var chr1, chr2, g, g1, g2, gn1, gn2, gnames1, gnames2, i, j, mar1, mar2, mycichart, mydotchart, ng1, ng2, p, pxg_data, x, _i, _j, _k, _l, _m, _n, _ref19, _ref20, _results, _results1, _results2;
    mar1 = scantwo_data.labels[markerindex1];
    mar2 = scantwo_data.labels[markerindex2];
    g1 = pheno_and_geno.geno[mar1];
    g2 = pheno_and_geno.geno[mar2];
    chr1 = pheno_and_geno.chr[mar1];
    chr2 = pheno_and_geno.chr[mar2];
    gnames1 = pheno_and_geno.genonames[chr1];
    gnames2 = pheno_and_geno.genonames[chr2];
    ng1 = gnames1.length;
    ng2 = gnames2.length;
    g = (function() {
      var _results;
      _results = [];
      for (i in g1) {
        _results.push(g1[i] + (g2[i] - 1) * ng1);
      }
      return _results;
    })();
    gn1 = [];
    gn2 = [];
    for (i = _i = 0; 0 <= ng1 ? _i < ng1 : _i > ng1; i = 0 <= ng1 ? ++_i : --_i) {
      for (j = _j = 0; 0 <= ng2 ? _j < ng2 : _j > ng2; j = 0 <= ng2 ? ++_j : --_j) {
        gn1.push(gnames1[i]);
        gn2.push(gnames2[j]);
      }
    }
    for (i = _k = 0; _k <= 1; i = ++_k) {
      if (g_eff[i] != null) {
        g_eff[i].remove();
      }
    }
    pxg_data = {
      g: g,
      y: pheno_and_geno.pheno,
      indID: pheno_and_geno.indID
    };
    mydotchart = dotchart().height(hright).width(wright).margin(margin).axispos(axispos).rectcolor(lightrect).pointsize(3).pointcolor(pointcolor).pointstroke(pointstroke).xcategories((function() {
      _results = [];
      for (var _l = 1, _ref19 = gn1.length; 1 <= _ref19 ? _l <= _ref19 : _l >= _ref19; 1 <= _ref19 ? _l++ : _l--){ _results.push(_l); }
      return _results;
    }).apply(this)).xcatlabels(gn1).xlab("").ylab("Phenotype").xvar("g").yvar("y").dataByInd(false).title("" + mar1 + " : " + mar2);
    g_eff[1] = svg.append("g").attr("id", "eff_1").attr("transform", "translate(" + eff_hpos[1] + ", " + eff_vpos[1] + ")").datum(pxg_data).call(mydotchart);
    cis = ci_by_group(g, pheno_and_geno.pheno, 1);
    ci_data = {
      means: (function() {
        var _m, _ref20, _ref21, _ref22, _results1;
        _results1 = [];
        for (x = _m = 1, _ref20 = gn1.length; 1 <= _ref20 ? _m <= _ref20 : _m >= _ref20; x = 1 <= _ref20 ? ++_m : --_m) {
          _results1.push((_ref21 = (_ref22 = cis[x]) != null ? _ref22.mean : void 0) != null ? _ref21 : null);
        }
        return _results1;
      })(),
      low: (function() {
        var _m, _ref20, _ref21, _ref22, _results1;
        _results1 = [];
        for (x = _m = 1, _ref20 = gn1.length; 1 <= _ref20 ? _m <= _ref20 : _m >= _ref20; x = 1 <= _ref20 ? ++_m : --_m) {
          _results1.push((_ref21 = (_ref22 = cis[x]) != null ? _ref22.low : void 0) != null ? _ref21 : null);
        }
        return _results1;
      })(),
      high: (function() {
        var _m, _ref20, _ref21, _ref22, _results1;
        _results1 = [];
        for (x = _m = 1, _ref20 = gn1.length; 1 <= _ref20 ? _m <= _ref20 : _m >= _ref20; x = 1 <= _ref20 ? ++_m : --_m) {
          _results1.push((_ref21 = (_ref22 = cis[x]) != null ? _ref22.high : void 0) != null ? _ref21 : null);
        }
        return _results1;
      })(),
      categories: (function() {
        _results1 = [];
        for (var _m = 1, _ref20 = gn1.length; 1 <= _ref20 ? _m <= _ref20 : _m >= _ref20; 1 <= _ref20 ? _m++ : _m--){ _results1.push(_m); }
        return _results1;
      }).apply(this)
    };
    mycichart = cichart().height(hright).width(wright).margin(margin).axispos(axispos).rectcolor(lightrect).segcolor(linecolor).vertsegcolor(linecolor).segstrokewidth(linewidth).xlab("").ylab("Phenotype").xcatlabels(gn1).title("" + mar1 + " : " + mar2);
    g_eff[0] = svg.append("g").attr("id", "eff_0").attr("transform", "translate(" + eff_hpos[0] + ", " + eff_vpos[0] + ")").datum(ci_data).call(mycichart);
    _results2 = [];
    for (p = _n = 0; _n <= 1; p = ++_n) {
      g_eff[p].select("svg").append("g").attr("class", "x axis").selectAll("empty").data(gn2).enter().append("text").attr("x", function(d, i) {
        return mydotchart.xscale()(i + 1);
      }).attr("y", margin.top + hright + margin.bottom / 2 + axispos.xlabel).text(function(d) {
        return d;
      });
      _results2.push(g_eff[p].select("svg").append("g").attr("class", "x axis").selectAll("empty").data([mar1, mar2]).enter().append("text").attr("x", (margin.left + mydotchart.xscale()(1)) / 2.0).attr("y", function(d, i) {
        return margin.top + hright + margin.bottom / 2 * i + axispos.xlabel;
      }).style("text-anchor", "end").text(function(d) {
        return d + ":";
      }));
    }
    return _results2;
  };
};

add_symmetric_lod = function(scantwo_data) {
  var i, j, _i, _j, _k, _l, _len, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
  scantwo_data.full = scantwo_data.lod.map(function(d) {
    return d.map(function(dd) {
      return dd;
    });
  });
  scantwo_data.add = scantwo_data.lod.map(function(d) {
    return d.map(function(dd) {
      return dd;
    });
  });
  scantwo_data.fv1 = scantwo_data.lodv1.map(function(d) {
    return d.map(function(dd) {
      return dd;
    });
  });
  scantwo_data.av1 = scantwo_data.lodv1.map(function(d) {
    return d.map(function(dd) {
      return dd;
    });
  });
  scantwo_data.int = scantwo_data.lod.map(function(d) {
    return d.map(function(dd) {
      return dd;
    });
  });
  for (i = _i = 0, _ref = scantwo_data.lod.length - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    for (j = _j = _ref1 = i + 1, _ref2 = scantwo_data.lod[i].length; _ref1 <= _ref2 ? _j < _ref2 : _j > _ref2; j = _ref1 <= _ref2 ? ++_j : --_j) {
      scantwo_data.full[i][j] = scantwo_data.lod[j][i];
      scantwo_data.add[j][i] = scantwo_data.lod[i][j];
      scantwo_data.fv1[i][j] = scantwo_data.lodv1[j][i];
      scantwo_data.av1[j][i] = scantwo_data.lodv1[i][j];
    }
  }
  scantwo_data.one = [];
  for (i = _k = 0, _ref3 = scantwo_data.lod.length; 0 <= _ref3 ? _k < _ref3 : _k > _ref3; i = 0 <= _ref3 ? ++_k : --_k) {
    scantwo_data.full[i][i] = 0;
    scantwo_data.add[i][i] = 0;
    scantwo_data.fv1[i][i] = 0;
    scantwo_data.av1[i][i] = 0;
    scantwo_data.one.push(scantwo_data.lod[i]);
    for (j = _l = 0, _ref4 = scantwo_data.lod.length; 0 <= _ref4 ? _l < _ref4 : _l > _ref4; j = 0 <= _ref4 ? ++_l : --_l) {
      scantwo_data.int[i][j] = scantwo_data.full[i][j] - scantwo_data.add[i][j];
    }
  }
  scantwo_data.lod = null;
  scantwo_data.lodv1 = null;
  scantwo_data.max = {};
  _ref5 = ["full", "add", "fv1", "av1", "int"];
  for (_m = 0, _len = _ref5.length; _m < _len; _m++) {
    i = _ref5[_m];
    scantwo_data.max[i] = matrixMax(scantwo_data[i]);
  }
  return scantwo_data;
};

lod_for_heatmap = function(scantwo_data, left, right) {
  var i, j, thelod, z, _i, _j, _ref, _ref1;
  z = scantwo_data.full.map(function(d) {
    return d.map(function(dd) {
      return dd;
    });
  });
  for (i = _i = 0, _ref = z.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    for (j = _j = 0, _ref1 = z.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
      thelod = j < i ? right : left;
      z[i][j] = scantwo_data[thelod][i][j] / scantwo_data.max[thelod] * scantwo_data.max["full"];
    }
  }
  return z;
};

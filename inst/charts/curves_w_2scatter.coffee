# curves_w_2scatter: Plot of a bunch of curves, linked to points in two scatterplots
# Karl W Broman

curves_w_2scatter = (curve_data, scatter1_data, scatter2_data) ->

  htop = 500
  hbot = 500
  width = 1000
  margin = {left:60, top:40, right:40, bottom: 40, inner:5}
  totalh = htop + hbot + 2*(margin.top + margin.bottom)
  totalw = width + margin.left + margin.right
  wtop = (width - margin.left - margin.right)/2

  svg = d3.select("div#chart")
          .append("svg")
          .attr("height", totalh)
          .attr("width", totalw)

  myscatterplot1 = scatterplot().width(wtop)
                                .height(htop)

  myscatterplot2 = scatterplot().width(wtop)
                                .height(htop)

  g_scat1 = svg.append("g")
               .attr("id", "scatterplot1")
               .datum(scatter1_data)
               .call(myscatterplot1)

  g_scat2 = svg.append("g")
               .attr("id", "scatterplot2")
               .attr("transform", "translate(#{wtop+margin.left+margin.right},0)")
               .datum(scatter2_data)
               .call(myscatterplot2)

  mycurvechart = curvechart().width(width)
                             .height(hbot)

  g_curves = svg.append("g")
                .attr("id", "curvechart")
                .attr("transform", "translate(0,#{htop+margin.top+margin.bottom})")
                .datum(curve_data)
                .call(mycurvechart)

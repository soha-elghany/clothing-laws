async function franceNetworkChart() {

    var data = await d3.json("./network.json")
    console.log(data)

    var height = 544
    var width = 569 

    var links = data.links.map(d => Object.create(d));
    var nodes = data.nodes.map(d => Object.create(d));

    var forceLink = d3
    .forceLink().id(function (d) {
        return d.id;
    })
    .distance(function (d) {
        return GetNodeDefaults(d.label).linkDistance;
    })
    .strength(0.1);

    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
            .id(d => d.id)
            .distance(0))
        .force("charge", d3.forceManyBody(0))
        .force('collision', d3.forceCollide(0).radius(1))
        .force("x", d3.forceX(0.1))
        .force("y", d3.forceY(0.1))
        //.force("center", d3.forceCenter());

    var svg = d3.select("#france")
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    var link = svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#ffe3d8")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1);

    var node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r",2)
        .attr("fill", "#f2d974")
        .attr("fill-opacity", 1);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });
    console.log(node)


    // var tooltipText = node.append("title")
    //     .text(d => d.id);

    // console.log(links)

    let csvtext = nodes.map(  d => (d.index +","+d.cx+","+d.y+","+d.label+","+d.id +"\n")  ).join('')
    console.log(csvtext)

    let csvtext2 = links.map(  d => (d.index +","+d.source.x+","+d.source.y+",source"+","+d.source.id +"\n")  ).join('')
    console.log(csvtext2)

    let csvtext3 = links.map(  d => (d.index +","+d.target.x+","+d.target.y+",target"+","+d.target.id +"\n")  ).join('')
    console.log(csvtext3)


}
franceNetworkChart()
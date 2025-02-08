// Set up SVG dimensions and margins
const width = 600, height = 400, margin = { top: 50, right: 50, bottom: 50, left: 50 };

// Select the SVG element and set its width and height
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// Define the dataset (scatterplot points)
const data = [
    { category: "A", x: 10, y: 90, newY: 30 },
    { category: "B", x: 30, y: 40, newY: 80 },
    { category: "C", x: 50, y: 70, newY: 50 },
    { category: "D", x: 70, y: 20, newY: 90 },
    { category: "E", x: 90, y: 60, newY: 20 }
];

// Define scales for positioning
const xScale = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
const yScale = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

// Add circles for scatterplot
const circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 8)
    .attr("fill", "steelblue");

// Add text labels
const labels = svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.x) + 10)
    .attr("y", d => yScale(d.y) + 5)
    .text(d => d.category)
    .attr("font-size", "12px")
    .attr("fill", "black");

// Add x-axis
svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

// Add y-axis
svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));



function transitionToSlopeChart() {
    // Move circles to new positions
    circles.transition()
        .duration(1000)
        .attr("cx", (d, i) => i % 2 === 0 ? xScale(20) : xScale(80)) // Move to left or right
        .attr("cy", d => yScale(d.newY))
        .attr("fill", "orange"); // Change color to indicate transition

    // Move text labels
    labels.transition()
        .duration(1000)
        .attr("x", (d, i) => i % 2 === 0 ? xScale(20) - 15 : xScale(80) + 5)
        .attr("y", d => yScale(d.newY) + 5);

    // Draw slope lines
    const lines = svg.selectAll(".slope-line")
        .data(data);

    // Enter new lines
    lines.enter()
        .append("line")
        .attr("class", "slope-line")
        .attr("x1", d => xScale(d.x))
        .attr("y1", d => yScale(d.y))
        .attr("x2", d => xScale(d.x)) // Start at same x position
        .attr("y2", d => yScale(d.y)) // Start at same y position
        .attr("stroke", "gray")
        .attr("stroke-width", 2)
        .transition()
        .duration(1000)
        .attr("x2", (d, i) => i % 2 === 0 ? xScale(20) : xScale(80)) // Move x position
        .attr("y2", d => yScale(d.newY)); // Move y position
}

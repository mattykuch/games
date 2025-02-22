
async function drawLineChart2021() {

    // 1. Access the data
    // 1.1 Load the data

    const dataset2 = await d3.csv("../data/nyc_weekly_temperature.csv", d3.autoType) //d3.autoType method automatically changes the max-temp & date to JS format
    
    // 1.2 Create Accessor for y and x data points

    yAccessor = d => d.max_temp_F    
    xAccessor = d => d.date

    console.log(yAccessor(dataset2[0]));

    console.log(xAccessor(dataset2[0]));

    // 2. Create chart dimensions
    // 2.1 Store the dimensions that wraps around the 1st layer "wrapper" of the chart (width, height and margins) in an array

    let dimensions = {
        width: window.innerWidth * 0.9, // Use the innerwidth of the screen-window to determine the width
        height: 400,
        margin: { // The margin between the wrapper layer and the inner boundary/ 2nd layer
          top: 15,
          right: 15,
          bottom: 40,
          left: 60,
        },
      }

    // 2.1 Include the relative dimensions of the inner boundary "bounded" - the 2nd layer of the chart area

    dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    // Draw the canvas

    const wrapper = d3.select("#line-chart-2") // Drawing the svg wrapper layer, based on set dimensions
      .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)

    const bounds = wrapper.append("g") // Drawing an empty boundary layer with "g" svg element, which is like the "div" html tag for svg
    .style("transform", `translate(${
        dimensions.margin.left
    }px, ${
        dimensions.margin.top
    }px)`)

    // Draw the scales 






    
}

drawLineChart2021();
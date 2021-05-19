import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
function App() {
  const data = [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armeniaa", index2005: 6, index2006: 16 }
  ];
  let [datos, setDatos] = useState(data.map(d => {
    let dato = {name: d.name, index: d.index2005}
    return(dato)
  }))
  const canvas = useRef();
  const drawChart = () => {
    console.log(datos)
    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;
    const svg = d3
      .select(canvas.current)
      .attr("width", width)
      .attr("height", height);
    
    const y = d3.scaleLinear()
    .domain([0, 45])
    .range([iheight, 0]);


    const x = d3
      .scaleBand()
      .domain(datos.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const xAxis = d3.axisBottom(x);

    svg.select('.x-axis').attr("transform", `translate(0, ${iheight})`).call(xAxis)

    xAxis(svg.select('.x-axis'))

    const yAxis = d3.axisLeft(y);

    svg.select('.y-axis').call(yAxis)

    yAxis(svg.select('.y-axis'))


    svg
      .selectAll(".bar")
      .data(datos)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)")
      .attr("x", d => x(d.name))
      .attr("y", -iheight)
      .attr("width", x.bandwidth())
      .transition()
      .attr("height", d => iheight - y(d.index))
  };

  useEffect(() => {
    //obtener los datos
    drawChart();
  },[datos]);
  return (
    <div>
      <svg ref={canvas}>
        <g className = "x-axis"/>
        <g className = "y-axis"/>
      </svg>
      <span>
      <button onClick = {
        ()=>{
          setDatos(data.map(d => {
            let dato = {name: d.name, index: d.index2005}
            return(dato)
          }))
        }
      }>2005</button>
      <button onClick = {
        ()=>{
          setDatos(data.map(d => {
            let dato = {name: d.name, index: d.index2006}
            return(dato)
          }))
        }
      }>2006</button>
      </span>
    </div>
        );
}
export default App;
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

interface GraphData {
  nodes: Node[];
  links: { source: number; target: number }[];
}

interface SimulationNodeDatum extends d3.SimulationNodeDatum {
  id: number;
}

export const DependencyGraph: React.FC<{ data:GraphData}> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        const width = +svg.attr('width');
        const height = +svg.attr('height');

        const simulationNodes = d3
          .forceSimulation(data.nodes as unknown as SimulationNodeDatum[])
          .nodes() as SimulationNodeDatum[];
          const simulation = d3
          .forceSimulation(data.nodes as unknown as SimulationNodeDatum[])
          .force('link', d3.forceLink(data.links).id((d: any) => {return d.id}))
          .force('charge', d3.forceManyBody().strength(-40))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .force('collision', d3.forceCollide().radius(15))
          .force('x', d3.forceX())
          .force('y', d3.forceY());
          
        svg.selectAll<SVGGElement, SimulationNodeDatum>('g').remove();
      
        const linkElements = svg
          .append('g')
          .selectAll<SVGLineElement, typeof data.links[0]>('line')
          .data(data.links)
          .join('line')
          .attr('stroke', 'black')
          .attr('stroke-width', 1);
          
        const nodeElements = svg
          .append('g')
          .selectAll<SVGGElement, SimulationNodeDatum>('g')
          .data(simulationNodes)
          .join('g')
          .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
          .style("fill", (d: any) => {
            const start = new Date(d.startDate);
            const end = new Date(d.endDate);
            const gradient = d3.scaleLinear<string>().domain([start.getTime(), end.getTime()])
              .range(["lightgreen", "orange", "red"]);
            return gradient(end.getTime());
          })
          .call(d3.drag<SVGGElement, SimulationNodeDatum>()
            .on('start', (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on('drag', (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on('end', (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }));
            
        
          const circleSize = d3.scaleLinear<number>().domain([0, 1000 * 60 * 60 * 24 * 365 * 10])
            .range([2, 4, 8]);
          nodeElements
            .append('circle')
            .attr('r', (d: any) => {
              const start = new Date(d.startDate);
              const end = new Date(d.endDate);
              return circleSize(end.getTime() - start.getTime());
            })
            .attr('fill', 'lightblue');

        nodeElements
          .append('text')
          .text((d) => d.id.toString())
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'middle');
      
        simulation.on('tick', () => {
          nodeElements
            .attr('transform', (d) => `translate(${d.x}, ${d.y})`);
      
          linkElements
            .attr('x1', (d: any) => d.source.x)
            .attr('y1', (d: any) => d.source.y)
            .attr('x2', (d: any) => d.target.x)
            .attr('y2', (d: any) => d.target.y);
        });
      }, [data]);

      return <svg ref={svgRef} width={1200} height={810} />
};
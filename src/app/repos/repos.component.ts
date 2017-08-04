import { Component } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent {
  title = 'repos';

  ngOnInit() {
    this.initRepos();
  }

  initRepos() {
    let svg = d3.select('svg');

    const width = svg.attr('width');
    const height = svg.attr('height');

    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    const zoomed = () => {
      svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ')' + ' scale(' + d3.event.transform.k + ')');
    };

    svg = svg.call(d3.zoom().on('zoom', zoomed)).append('g');

    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d.name).distance(70))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const createGraph = (error, graph) => {
      if (error) throw error;

      const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.links)
        .enter()
        .append('line')
        .attr('stroke', 'black')
        .attr('marker-end', 'url(#arrow)')

      const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('node')
        .data(graph.nodes)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', (d) => {
          return {
            queue: '#ff6600',
            database: '#00bef2',
            repository: '#34495e',
            undefined: '#fff'
          }[d.type.toLowerCase()];
        })
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
        )

      const text = svg.append('g').attr('class', 'labels').selectAll('g')
        .data(graph.nodes)
        .enter()
        .append('g');

      text.append('text')
        .attr('x', 14)
        .attr('y', '.31em')
        .style('font-family', 'sans-serif')
        .style('font-size', '0.7em')
        .append('a')
        .attr('xlink:href', (d) => d.href)
        .text((d) => d.name);

      node.append('title')
        .text((d) => d.name);

      simulation
        .nodes(graph.nodes)
        .on('tick', () => {
          link
            .attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => d.target.x)
            .attr('y2', (d) => d.target.y);

          node
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y);

          text
            .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

        });

      simulation
        .force('link')
        .links(graph.links);
    }

    const data = {
      nodes: [{
        name: 'BOv2-plugins-moderation-backend',
        href: 'https://github.com/livee/BOv2-plugins-moderation-backend',
        desc: '',
        type: 'repo',
        created_at: '2017-07-24T15:18:20Z',
        updated_at: '2017-07-26T16:10:57Z'
      }, {
        desc: 'fetch messages to moderate from RabbitMQ',
        href: '',
        name: 'RabbitMQ#moderation',
        type: 'queue'
      }, {
        desc: 'store and retrieve state of messages',
        href: '',
        name: 'PostgreSQL#messages-moderation',
        type: 'database'
      }, {
        name: 'BOv2-plugins-moderation-frontend',
        href: 'https://github.com/livee/BOv2-plugins-moderation-frontend',
        desc: '',
        type: 'repo',
        created_at: '2017-07-24T15:18:34Z',
        updated_at: '2017-07-24T15:18:52Z'
      }],
      links: [{
        source: 'RabbitMQ#moderation',
        target: 'BOv2-plugins-moderation-backend',
        href: ''
      }, {
        source: 'BOv2-plugins-moderation-backend',
        target: 'BOv2-plugins-moderation-frontend',
        type: 'repo'
      }, {
        source: 'BOv2-plugins-moderation-frontend',
        target: 'BOv2-plugins-moderation-backend',
        type: 'repo'
      }, {
        source: 'BOv2-plugins-moderation-backend',
        target: 'PostgreSQL#messages-moderation',
        type: 'database'
      }, {
        source: 'PostgreSQL#messages-moderation',
        target: 'BOv2-plugins-moderation-backend',
        type: 'database'
      }]
    };

    createGraph(false, data);
  }

}

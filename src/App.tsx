// import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import { Graph } from '@antv/x6';
import { Settings } from './settings';



export default class App extends React.PureComponent {
  private container: HTMLDivElement
  private graph: Graph

  componentDidMount(): void {
    this.graph = new Graph({
      container: this.container,
      grid: { visible: true },
      background: {color: '#fffbe6'}
    })

    const source = this.graph.addNode({
      x: 32,
      y: 32,
      width: 100,
      height: 40,
      label: 'Hello'
    })

    const target = this.graph.addNode({
      x: 80,
      y: 180,
      width: 100,
      height: 40,
      label: 'Graid'
    })

    const linkNode = this.graph.addNode({
      x: 160,
      y: 260,
      width: 130,
      height: 60,
      label: 'React With Ports',
      ports: {
        groups: {
          in: {
            position: 'right',
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          }
        },
        items: [
          {
            id: 'port1',
            group: 'in'
          }
        ],
      }
    })

    this.graph.addEdge({
      source,
      target,
      linkNode
    })
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  onBackgroundChange = (options: Graph.BackgroundManager.Options) => {
    this.graph.drawBackground(options)
  }

  render() {
    return (
      <div className='app'>
        <div className="app-side">
          <Settings onChange={this.onBackgroundChange}/>
        </div>
        <div className="app-content" ref={this.refContainer} />
      </div>
    )
  }
}


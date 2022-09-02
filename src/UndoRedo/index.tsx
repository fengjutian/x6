import * as React from 'React';
import { Button } from 'antd'
import { Graph } from '@antv/x6'
import './index.css'

interface IProps { }

interface IState {
  canUndo: boolean;
  canRedo: boolean;
}

export default class UndoRedo extends React.Component<IProps, IState> {
  private container: HTMLDivElement
  private history: Graph.HistoryManager

  state: IState = {
    canRedo: false,
    canUndo: false
  }

  componentDidMount(): void {
    const graph = new Graph({
      container: this.container,
      grid: true,
      history: true
    })

    graph.addNode({
      x: 100,
      y: 60,
      width: 100,
      height: 40,
      label: 'Drag Me'
    })

    this.history = graph.history
    this.history.on('change', () => {
      this.setState({
        canRedo: this.history.canRedo(),
        canUndo: this.history.canUndo()
      })
    })
  }

  onUndo = () => {
    this.history.undo()
  }

  onRedo = () => {
    this.history.redo()
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  render() {
    return (
      <div className='app'>
        <div className='app-btns'>
          <Button.Group>
            <Button onClick={this.onUndo} disabled={!this.state.canUndo}> Undo </Button>
            <Button onClick={this.onRedo} disabled={!this.state.canRedo}> Redo </Button>
          </Button.Group>
        </div>
        <div ref={this.refContainer} className="app-content" />
      </div>
    )
  }
}
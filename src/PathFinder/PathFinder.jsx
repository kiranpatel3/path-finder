import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathFinder.css";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/Dijkstra";

const START_ROW = 10;
const START_COL = 15;
const END_ROW = 10;
const END_COL = 35;

export default class PathFinder extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridwithWall(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridwithWall(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  // componentDidMount = () => {
  //   const grid = [];
  //   for (let row = 0; row < 15; row++) {
  //     const currRow = [];
  //     for (let col = 0; col < 50; col++) {
  //       // const currNode = {
  //       //   col,
  //       //   row,
  //       // };
  //       // currRow.push(currNode);
  //       currRow.push([]);
  //     }
  //     grid.push(currRow);
  //   }
  //   this.setState({ grid });
  // };

  animateDijkstra(orderedVisitedNode, nodesInShortestPathOrder) {
    for (let i = 0; i <= orderedVisitedNode.length; i++) {
      if (i === orderedVisitedNode.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = orderedVisitedNode[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_ROW][START_COL];
    const endNode = grid[END_ROW][END_COL];
    const orderedVisitedNode = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    this.animateDijkstra(orderedVisitedNode, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    // const { grid } = this.state;
    console.log(grid);

    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {/* <div> */}
                {/* {row.map((node, nodeIdx) => (
                <Node></Node>
              ))} */}
                {row.map((node, nodeIdx) => {
                  const { row, col, isEnd, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isEnd={isEnd}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currRow = [];
    for (let col = 0; col < 50; col++) {
      currRow.push(createNode(col, row));
    }
    grid.push(currRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_ROW && col === START_COL,
    isEnd: row === END_ROW && col === END_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridwithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

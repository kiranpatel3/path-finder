import React, { Component } from "react";
import Node from "./Node/Node";
import Navigation from "./Navigation";
import "./PathFinder.css";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/Dijkstra";
import { astar } from "./Algorithms/Astar";
import { breadthFirstSearch } from "./Algorithms/BreadthFirstSearch";
import { depthFirstSearch } from "./Algorithms/DepthFirstSearch";
import {
  generateRecursiveDivisionMaze,
  generateHorizontalRecursiveDivisionMaze,
  generateVerticalRecursiveDivisionMaze,
} from "./Mazes/RecursiveDivision";

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
    const resetGrid = getInitialGrid();
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].isWall) {
          resetGrid[row][col].isWall = true;
        }
      }
    }

    this.setState({ grid: resetGrid });

    const freshStartNode = resetGrid[START_ROW][START_COL];
    const freshEndNode = resetGrid[END_ROW][END_COL];

    // Run Dijkstra algorithm
    const orderedVisitedNode = dijkstra(
      resetGrid,
      freshStartNode,
      freshEndNode
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(freshEndNode);

    // Animate the results
    this.animateDijkstra(orderedVisitedNode, nodesInShortestPathOrder);
  }

  visualizeAstar() {
    const { grid } = this.state;

    // Reset the grid to initial state but preserve walls
    const resetGrid = getInitialGrid();

    // Copy wall information from current grid to reset grid
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].isWall) {
          resetGrid[row][col].isWall = true;
        }
      }
    }

    this.setState({ grid: resetGrid });

    const freshStartNode = resetGrid[START_ROW][START_COL];
    const freshEndNode = resetGrid[END_ROW][END_COL];

    const orderedVisitedNode = astar(resetGrid, freshStartNode, freshEndNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(freshEndNode);

    this.animateDijkstra(orderedVisitedNode, nodesInShortestPathOrder);
  }

  visualizeBFS() {
    const { grid } = this.state;

    // Reset the grid to initial state but preserve walls
    const resetGrid = getInitialGrid();

    // Copy wall information from current grid to reset grid
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].isWall) {
          resetGrid[row][col].isWall = true;
        }
      }
    }

    this.setState({ grid: resetGrid });

    const freshStartNode = resetGrid[START_ROW][START_COL];
    const freshEndNode = resetGrid[END_ROW][END_COL];

    const orderedVisitedNode = breadthFirstSearch(
      resetGrid,
      freshStartNode,
      freshEndNode
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(freshEndNode);

    this.animateDijkstra(orderedVisitedNode, nodesInShortestPathOrder);
  }

  visualizeDFS() {
    const { grid } = this.state;

    const resetGrid = getInitialGrid();

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].isWall) {
          resetGrid[row][col].isWall = true;
        }
      }
    }

    this.setState({ grid: resetGrid });

    const freshStartNode = resetGrid[START_ROW][START_COL];
    const freshEndNode = resetGrid[END_ROW][END_COL];

    const orderedVisitedNode = depthFirstSearch(
      resetGrid,
      freshStartNode,
      freshEndNode
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(freshEndNode);

    this.animateDijkstra(orderedVisitedNode, nodesInShortestPathOrder);
  }

  handleAlgorithmSelect = (algorithm) => {
    switch (algorithm) {
      case "dijkstra":
        this.visualizeDijkstra();
        break;
      case "astar":
        this.visualizeAstar();
        break;
      case "bfs":
        this.visualizeBFS();
        break;
      case "dfs":
        this.visualizeDFS();
        break;
      default:
        console.log("Unknown algorithm:", algorithm);
    }
  };

  handleMazeSelect = (mazeType) => {
    switch (mazeType) {
      case "recursive-division":
        this.generateRecursiveDivisionMaze();
        break;
      case "horizontal-recursive-division":
        this.generateHorizontalRecursiveDivisionMaze();
        break;
      case "vertical-recursive-division":
        this.generateVerticalRecursiveDivisionMaze();
        break;
      default:
        console.log("Unknown maze type:", mazeType);
    }
  };

  generateRecursiveDivisionMaze() {
    this.generateAnimatedMaze(generateRecursiveDivisionMaze);
  }

  generateHorizontalRecursiveDivisionMaze() {
    this.generateAnimatedMaze(generateHorizontalRecursiveDivisionMaze);
  }

  generateVerticalRecursiveDivisionMaze() {
    this.generateAnimatedMaze(generateVerticalRecursiveDivisionMaze);
  }

  generateAnimatedMaze(mazeGenerator) {
    const resetGrid = getInitialGrid();
    this.setState({ grid: resetGrid });

    setTimeout(() => {
      const mazeGrid = mazeGenerator(resetGrid);

      this.animateMazeGeneration(mazeGrid);
    }, 100);
  }

  animateMazeGeneration(mazeGrid) {
    const wallNodes = [];

    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        const node = mazeGrid[row][col];
        if (node.isWall) {
          wallNodes.push({ row, col });
        }
      }
    }

    console.log(`Found ${wallNodes.length} wall nodes to animate`);

    wallNodes.sort((a, b) => {
      const centerRow = 10;
      const centerCol = 25;

      const distanceA = Math.sqrt(
        Math.pow(a.row - centerRow, 2) + Math.pow(a.col - centerCol, 2)
      );
      const distanceB = Math.sqrt(
        Math.pow(b.row - centerRow, 2) + Math.pow(b.col - centerCol, 2)
      );
      return distanceB - distanceA;
    });

    console.log("Starting wall animation...");

    wallNodes.forEach((node, index) => {
      setTimeout(() => {
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (nodeElement) {
          nodeElement.className = "node node-wall";
          console.log(`Placed wall at ${node.row}, ${node.col}`);
        }
      }, index * 10);
    });

    const totalAnimationTime = wallNodes.length * 10;
    setTimeout(() => {
      this.setState({ grid: mazeGrid });
      console.log("Grid state updated after animation");
    }, totalAnimationTime + 100);
  }

  clearGrid() {
    const grid = getInitialGrid();
    this.setState({ grid });

    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        if (nodeElement) {
          nodeElement.className = "node";
        }
      }
    }

    const startNodeElement = document.getElementById(
      `node-${START_ROW}-${START_COL}`
    );
    const endNodeElement = document.getElementById(
      `node-${END_ROW}-${END_COL}`
    );

    if (startNodeElement) {
      startNodeElement.className = "node node-start";
    }
    if (endNodeElement) {
      endNodeElement.className = "node node-end";
    }
  }

  clearPath() {
    const { grid } = this.state;

    const resetGrid = getInitialGrid();

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].isWall) {
          resetGrid[row][col].isWall = true;
        }
      }
    }

    this.setState({ grid: resetGrid });

    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        if (nodeElement) {
          const node = resetGrid[row][col];
          let className = "node";

          if (node.isStart) {
            className = "node node-start";
          } else if (node.isEnd) {
            className = "node node-end";
          } else if (node.isWall) {
            className = "node node-wall";
          }

          nodeElement.className = className;
        }
      }
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <Navigation
          onAlgorithmSelect={this.handleAlgorithmSelect}
          onMazeSelect={this.handleMazeSelect}
          onClearGrid={() => this.clearGrid()}
          onClearPath={() => this.clearPath()}
        />
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
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
    f: Infinity,
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

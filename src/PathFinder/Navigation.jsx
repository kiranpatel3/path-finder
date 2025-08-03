import React, { useState } from "react";
import "./Navigation.css";

const Navigation = ({
  onAlgorithmSelect,
  onMazeSelect,
  onClearGrid,
  onClearPath,
}) => {
  const [isAlgorithmDropdownOpen, setIsAlgorithmDropdownOpen] = useState(false);
  const [isMazeDropdownOpen, setIsMazeDropdownOpen] = useState(false);

  const toggleAlgorithmDropdown = () => {
    setIsAlgorithmDropdownOpen(!isAlgorithmDropdownOpen);
    setIsMazeDropdownOpen(false);
  };

  const toggleMazeDropdown = () => {
    setIsMazeDropdownOpen(!isMazeDropdownOpen);
    setIsAlgorithmDropdownOpen(false);
  };

  const handleAlgorithmClick = (algorithm) => {
    onAlgorithmSelect(algorithm);
    setIsAlgorithmDropdownOpen(false);
  };

  const handleMazeClick = (mazeType) => {
    onMazeSelect(mazeType);
    setIsMazeDropdownOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>Path Finder</h1>
        </div>

        <div className="nav-menu">
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={toggleAlgorithmDropdown}
            >
              Algorithms ▼
            </button>

            {isAlgorithmDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleAlgorithmClick("dijkstra")}
                  >
                    Dijkstra's Algorithm
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleAlgorithmClick("astar")}
                  >
                    A* Algorithm
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleAlgorithmClick("bfs")}
                  >
                    Breadth-First Search
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleAlgorithmClick("dfs")}
                  >
                    Depth-First Search
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleMazeDropdown}>
              Mazes ▼
            </button>

            {isMazeDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleMazeClick("recursive-division")}
                  >
                    Recursive Division Maze
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      handleMazeClick("horizontal-recursive-division")
                    }
                  >
                    Horizontal Recursive Division
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      handleMazeClick("vertical-recursive-division")
                    }
                  >
                    Vertical Recursive Division
                  </button>
                </li>
              </ul>
            )}
          </div>

          <button className="clear-button" onClick={onClearGrid}>
            Clear Grid
          </button>
          <button className="clear-button" onClick={onClearPath}>
            Clear Path
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

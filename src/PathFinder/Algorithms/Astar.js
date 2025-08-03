export function astar(grid, startNode, endNode) {
    const orderedVisitedNodes = [];

    const unvisitedNodes = getAllNodes(grid);
    for (const node of unvisitedNodes) {
        node.distance = Infinity;
        node.f = Infinity;
        node.isVisited = false;
        node.previousNode = null;
    }

    startNode.distance = 0;
    startNode.f = heuristic(startNode, endNode);

    while (!!unvisitedNodes.length) {
        sortNodesByF(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;

        if (closestNode.distance === Infinity) {
            console.log("No path found to end node");
            return orderedVisitedNodes;
        }

        closestNode.isVisited = true;
        orderedVisitedNodes.push(closestNode);

        if (closestNode === endNode) {
            console.log("Path found! Visited", orderedVisitedNodes.length, "nodes");
            return orderedVisitedNodes;
        }

        updateUnvisitedNeighbours(closestNode, grid, endNode);
    }

    console.log("No path found - algorithm completed without reaching end");
    return orderedVisitedNodes;
}

function sortNodesByF(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
}

function updateUnvisitedNeighbours(node, grid, endNode) {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of unvisitedNeighbours) {
        const tentativeDistance = node.distance + 1;
        if (tentativeDistance < neighbour.distance) {
            neighbour.distance = tentativeDistance;
            neighbour.previousNode = node;
            neighbour.f = tentativeDistance + heuristic(neighbour, endNode);
        }
    }
}

function heuristic(node, endNode) {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
}

function getUnvisitedNeighbours(node, grid) {
    const neighbours = [];
    const { col, row } = node;

    if (row > 0) {
        neighbours.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
        neighbours.push(grid[row + 1][col]);
    }
    if (col > 0) {
        neighbours.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
        neighbours.push(grid[row][col + 1]);
    }

    return neighbours.filter(neighbour => !neighbour.isVisited && !neighbour.isWall);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(endNode) {
    const nodesInShortestPathOrder = [];
    let currNode = endNode;
    while (currNode !== null) {
        nodesInShortestPathOrder.unshift(currNode);
        currNode = currNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
export function depthFirstSearch(grid, startNode, endNode) {
    const orderedVisitedNodes = [];

    const allNodes = getAllNodes(grid);
    for (const node of allNodes) {
        node.distance = Infinity;
        node.isVisited = false;
        node.previousNode = null;
    }

    startNode.distance = 0;

    const stack = [startNode];

    while (stack.length > 0) {
        const currentNode = stack.pop();

        if (currentNode.isWall) continue;

        if (currentNode.distance === Infinity) {
            console.log("No path found to end node");
            return orderedVisitedNodes;
        }

        if (currentNode.isVisited) continue;

        currentNode.isVisited = true;
        orderedVisitedNodes.push(currentNode);

        if (currentNode === endNode) {
            console.log("Path found! Visited", orderedVisitedNodes.length, "nodes");
            return orderedVisitedNodes;
        }

        const unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);
        for (let i = unvisitedNeighbours.length - 1; i >= 0; i--) {
            const neighbour = unvisitedNeighbours[i];
            neighbour.distance = currentNode.distance + 1;
            neighbour.previousNode = currentNode;
            stack.push(neighbour);
        }
    }

    console.log("No path found - algorithm completed without reaching end");
    return orderedVisitedNodes;
}

function getUnvisitedNeighbours(node, grid) {
    const neighbours = [];
    const { col, row } = node;

    if (row > 0) {
        neighbours.push(grid[row - 1][col]);
    }
    if (col < grid[0].length - 1) {
        neighbours.push(grid[row][col + 1]);
    }
    if (row < grid.length - 1) {
        neighbours.push(grid[row + 1][col]);
    }
    if (col > 0) {
        neighbours.push(grid[row][col - 1]);
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
export function breadthFirstSearch(grid, startNode, endNode) {
    const orderedVisitedNodes = [];

    const allNodes = getAllNodes(grid);
    for (const node of allNodes) {
        node.distance = Infinity;
        node.isVisited = false;
        node.previousNode = null;
    }

    startNode.distance = 0;
    startNode.isVisited = true;
    orderedVisitedNodes.push(startNode);

    if (startNode === endNode) {
        return orderedVisitedNodes;
    }

    const queue = [startNode];

    while (queue.length > 0) {
        const currentNode = queue.shift();

        const unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);

        for (const neighbour of unvisitedNeighbours) {
            neighbour.distance = currentNode.distance + 1;
            neighbour.previousNode = currentNode;
            neighbour.isVisited = true;
            orderedVisitedNodes.push(neighbour);
            queue.push(neighbour);

            if (neighbour === endNode) {
                return orderedVisitedNodes;
            }
        }
    }

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
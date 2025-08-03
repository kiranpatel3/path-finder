export function generateRecursiveDivisionMaze(grid) {
    // Initialize grid with no walls
    const mazeGrid = grid.map(row =>
        row.map(node => ({
            ...node,
            isWall: false,
            isVisited: false,
            distance: Infinity,
            f: Infinity,
            previousNode: null
        }))
    );

    // Add border walls but preserve start and end points
    addBorderWalls(mazeGrid);

    // Start recursive division with mixed orientation
    recursiveDivision(mazeGrid, 1, 1, mazeGrid[0].length - 2, mazeGrid.length - 2, 'mixed');

    // Ensure start and end points are not blocked
    ensureStartEndAccessible(mazeGrid);

    return mazeGrid;
}

export function generateHorizontalRecursiveDivisionMaze(grid) {
    // Initialize grid with no walls
    const mazeGrid = grid.map(row =>
        row.map(node => ({
            ...node,
            isWall: false,
            isVisited: false,
            distance: Infinity,
            f: Infinity,
            previousNode: null
        }))
    );

    // Add border walls but preserve start and end points
    addBorderWalls(mazeGrid);

    // Start recursive division with horizontal preference
    recursiveDivision(mazeGrid, 1, 1, mazeGrid[0].length - 2, mazeGrid.length - 2, 'horizontal');

    // Ensure start and end points are not blocked
    ensureStartEndAccessible(mazeGrid);

    return mazeGrid;
}

export function generateVerticalRecursiveDivisionMaze(grid) {
    // Initialize grid with no walls
    const mazeGrid = grid.map(row =>
        row.map(node => ({
            ...node,
            isWall: false,
            isVisited: false,
            distance: Infinity,
            f: Infinity,
            previousNode: null
        }))
    );

    // Add border walls but preserve start and end points
    addBorderWalls(mazeGrid);

    // Start recursive division with vertical preference
    recursiveDivision(mazeGrid, 1, 1, mazeGrid[0].length - 2, mazeGrid.length - 2, 'vertical');

    // Ensure start and end points are not blocked
    ensureStartEndAccessible(mazeGrid);

    return mazeGrid;
}

function addBorderWalls(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Add top and bottom borders (but preserve start and end points)
    for (let col = 0; col < cols; col++) {
        if (!grid[0][col].isStart && !grid[0][col].isEnd) {
            grid[0][col].isWall = true;
        }
        if (!grid[rows - 1][col].isStart && !grid[rows - 1][col].isEnd) {
            grid[rows - 1][col].isWall = true;
        }
    }

    // Add left and right borders (but preserve start and end points)
    for (let row = 0; row < rows; row++) {
        if (!grid[row][0].isStart && !grid[row][0].isEnd) {
            grid[row][0].isWall = true;
        }
        if (!grid[row][cols - 1].isStart && !grid[row][cols - 1].isEnd) {
            grid[row][cols - 1].isWall = true;
        }
    }
}

function recursiveDivision(grid, startX, startY, endX, endY, orientation = 'mixed') {
    if (endX - startX < 2 || endY - startY < 2) {
        return;
    }

    // Choose orientation based on preference
    const width = endX - startX + 1;
    const height = endY - startY + 1;

    let horizontal;
    switch (orientation) {
        case 'horizontal':
            horizontal = true;
            break;
        case 'vertical':
            horizontal = false;
            break;
        case 'mixed':
        default:
            horizontal = height > width;
            break;
    }

    if (horizontal) {
        // Horizontal division
        const wallY = Math.floor((startY + endY) / 2);
        const passageX = Math.floor(Math.random() * (endX - startX + 1)) + startX;

        // Add horizontal wall with one passage
        for (let x = startX; x <= endX; x++) {
            if (x !== passageX) {
                grid[wallY][x].isWall = true;
            }
        }

        // Recursively divide the two chambers
        recursiveDivision(grid, startX, startY, endX, wallY - 1, orientation);
        recursiveDivision(grid, startX, wallY + 1, endX, endY, orientation);
    } else {
        // Vertical division
        const wallX = Math.floor((startX + endX) / 2);
        const passageY = Math.floor(Math.random() * (endY - startY + 1)) + startY;

        // Add vertical wall with one passage
        for (let y = startY; y <= endY; y++) {
            if (y !== passageY) {
                grid[y][wallX].isWall = true;
            }
        }

        // Recursively divide the two chambers
        recursiveDivision(grid, startX, startY, wallX - 1, endY, orientation);
        recursiveDivision(grid, wallX + 1, startY, endX, endY, orientation);
    }
}

function ensureStartEndAccessible(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Find start and end positions
    let startRow = -1, startCol = -1, endRow = -1, endCol = -1;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col].isStart) {
                startRow = row;
                startCol = col;
            }
            if (grid[row][col].isEnd) {
                endRow = row;
                endCol = col;
            }
        }
    }

    // Ensure start and end points are not walls
    if (startRow !== -1 && startCol !== -1) {
        grid[startRow][startCol].isWall = false;
    }
    if (endRow !== -1 && endCol !== -1) {
        grid[endRow][endCol].isWall = false;
    }

    // Create a simple path from start to end if needed
    // This ensures there's always at least one path
    if (startRow !== -1 && endRow !== -1) {
        createSimplePath(grid, startRow, startCol, endRow, endCol);
    }
}

function createSimplePath(grid, startRow, startCol, endRow, endCol) {
    // Create a simple L-shaped path from start to end
    // First go horizontally, then vertically

    // Horizontal path from start
    const horizontalDirection = startCol < endCol ? 1 : -1;
    let currentCol = startCol;

    while (currentCol !== endCol) {
        currentCol += horizontalDirection;
        if (currentCol >= 0 && currentCol < grid[0].length) {
            grid[startRow][currentCol].isWall = false;
        }
    }

    // Vertical path to end
    const verticalDirection = startRow < endRow ? 1 : -1;
    let currentRow = startRow;

    while (currentRow !== endRow) {
        currentRow += verticalDirection;
        if (currentRow >= 0 && currentRow < grid.length) {
            grid[currentRow][endCol].isWall = false;
        }
    }
} 
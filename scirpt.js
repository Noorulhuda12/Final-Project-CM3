console.log("Script loaded!");

class Maze {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
        this.startCoord = null;
        this.endCoord = null;
        this.generateMaze();
    }

    createGrid() {
        const grid = [];
        for (let y = 0; y < this.rows; y++) {
            const row = [];
            for (let x = 0; x < this.cols; x++) {
                row.push({
                    n: false,
                    s: false,
                    e: false,
                    w: false,
                    visited: false,
                    priorPos: null
                });
            }
            grid.push(row);
        }
        return grid;
    }

    map() {
        return this.grid;
    }

    generateMaze() {
        // Move your maze generation logic here.
    }
}

function makeMaze() {
    var diff = document.getElementById("diffSelect").value; // Get difficulty
    var maze = new Maze(diff, diff); // Create new maze instance
    var canvas = document.getElementById("mazeCanvas");
    var ctx = canvas.getContext("2d"); // Get canvas context

    DrawMaze(maze, ctx, canvas.width / diff);
    toggleVisablity("mazeContainer"); // Show the maze container if hidden
}

function DrawMaze(Maze, ctx, cellsize) {
    var map = Maze.map();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas

    ctx.beginPath(); // Start drawing
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            var cell = map[y][x];
            var startX = x * cellsize;
            var startY = y * cellsize;

            // Draw walls based on the cell's properties
            if (!cell.n) {
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX + cellsize, startY); // Draw north wall
            }
            if (!cell.s) {
                ctx.moveTo(startX, startY + cellsize);
                ctx.lineTo(startX + cellsize, startY + cellsize); // Draw south wall
            }
            if (!cell.e) {
                ctx.moveTo(startX + cellsize, startY);
                ctx.lineTo(startX + cellsize, startY + cellsize); // Draw east wall
            }
            if (!cell.w) {
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX, startY + cellsize); // Draw west wall
            }
        }
    }
    ctx.stroke(); // Render the maze
}
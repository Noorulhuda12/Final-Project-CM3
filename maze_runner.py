# Simple text-based Maze Runner for testing inside Codespaces
maze = [
    "#########",
    "#   #   #",
    "# # # # #",
    "# #   # #",
    "# ##### #",
    "#       #",
    "#########"
]

# Player starting position
player_x, player_y = 1, 1

# Function to print the maze
def print_maze():
    for y in range(len(maze)):
        row = ""
        for x in range(len(maze[y])):
            if x == player_x and y == player_y:
                row += "P"  # Player
            else:
                row += maze[y][x]
        print(row)
    print("\nUse WASD to move. Type 'quit' to exit.")

# Main loop for movement
print_maze()
while True:
    move = input("Move (WASD): ").strip().lower()
    if move == "quit":
        break

    new_x, new_y = player_x, player_y
    if move == "w":
        new_y -= 1
    elif move == "s":
        new_y += 1
    elif move == "a":
        new_x -= 1
    elif move == "d":
        new_x += 1

    if maze[new_y][new_x] == " ":
        player_x, player_y = new_x, new_y

    print_maze()
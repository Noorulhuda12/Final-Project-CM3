import os
os.environ["PANDA3D_PREFER_SOFTWARE_RENDERER"] = "true"  # Force software renderer
os.environ["DISPLAY"] = ":1"  # Use the virtual display
os.environ["PANDA3D_NO_OPENGL"] = "1"  # Disable OpenGL to force the software renderer

import os
os.environ["PANDA3D_PREFER_SOFTWARE_RENDERER"] = "true"
os.environ["DISPLAY"] = ":1"
os.environ["PANDA3D_NO_OPENGL"] = "1"
from ursina import *

# Initialize the game
app = Ursina()

# Create a basic floor
ground = Entity(model='plane', texture='white_cube', scale=(10, 1, 10), collider='box')

# Create walls for the maze
wall1 = Entity(model='cube', color=color.red, scale=(1, 2, 4), position=(2, 1, 0), collider='box')
wall2 = Entity(model='cube', color=color.blue, scale=(1, 2, 4), position=(-2, 1, 0), collider='box')

# Add a First-Person Controller
player = FirstPersonController()

# Run the game
app.run()
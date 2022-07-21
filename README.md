## Getting Started
First, Install nodejs
Then, install the dependencies
```bash
npm i
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
```
****
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Working Link
Project Deployed at: https://cab-booking-gules.vercel.app/

### Folder Structure
1. /components
    - Graph.js:
      - Contains the structure for Class Graph
      - PriorityQueue for Dijkstra Algorithm Path
    - Canvas.js:
      - init: Draw roads between vertices
      - map: Draw farm, lawn, water
      - points: Label and Mark the vertices
2. /pages
    - _app.js :
      - Initialise the graph
      - Select the vertices
      - Select coordinates for each vertex
      - Animation and path plotting functions
    - index.js:
      - Functions calls for Shortest, Fastest, Reset
      - HTML for Shortest, Fastest, Reset

### Distance and Time Weights (Statically Hard-Coded)
| Source | Destination | Distance | Time |
|--------|--------|--------|--------|
| A | B | 10 | 1.0 |
| A | I | 13 | 0.3 |
| B | C | 5 | 0.5 |
| B | J | 12 | 1.2 |
| C | D | 7 | 0.7 |
| C | J | 2 | 10.2 |
| D | E | 5 | 0.5 |
| D | F | 9 | 0.9 |
| E | F | 6 | 0.6 |
| F | G | 7 | 6.7 |
| F | J | 11 | 5.1 |
| G | I | 14 | 8.4 |
| H | I | 16 | 1.6 |
| I | J | 13 | 0.3 |
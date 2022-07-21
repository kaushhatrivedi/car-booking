// Helper for PriorityQueue
class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}
  
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }

    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;
    
            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}
    
    
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList[vertex])
            this.adjacencyList[vertex] = [];
    }
    
    addEdge(vertex1, vertex2, distance, time) {
        this.adjacencyList[vertex1].push({ node: vertex2, distance, time });
        this.adjacencyList[vertex2].push({ node: vertex1, distance, time });
    }
    
    print() {
        console.log(this.adjacencyList)
    }
    
    DijkstraDistance(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = []; // Route to follow
        let smallest;

        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            }
            else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    //calculate new distance to neighboring node
                    let newNeighbour = distances[smallest] + nextNode.distance;
                    let nextNeighbor = nextNode.node;
                    if (newNeighbour < distances[nextNeighbor]) {
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = newNeighbour;
                        //updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, newNeighbour);
                    }
                }
            }
        }
        // console.log(distances)
        return path.concat(smallest).reverse();
    }

    DijkstraFast(start, finish) {
        const nodes = new PriorityQueue();
        const time = {};
        const previous = {};
        let path = []; // Path to follow
        let smallest;

        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                time[vertex] = 0;
                nodes.enqueue(vertex, 0);
            }
            else {
                time[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || time[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    //calculate new time to neighboring node
                    let newNeighbour = time[smallest] + nextNode.time;
                    let nextNeighbor = nextNode.node;
                    if (newNeighbour < time[nextNeighbor]) {
                        //updating new smallest time to neighbor
                        time[nextNeighbor] = newNeighbour;
                        //updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, newNeighbour);
                    }
                }
            }
        }
        // console.log(time)
        return path.concat(smallest).reverse();
    }
}

export default Graph;
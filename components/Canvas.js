import React, {useState, useEffect, useContext} from 'react'
import AppContext from './AppContext'

const Canvas = () => {
    const {ctx, graph, nodes, vertices} = useContext(AppContext)

    // Connect the vertices with roads
    const init = (source, destination) => {
        ctx.lineWidth = "7";
        ctx.strokeStyle = '#ddd';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(nodes[`${source}`][0], nodes[`${source}`][1]);
        ctx.lineTo(nodes[`${destination}`][0], nodes[`${destination}`][1]);
        ctx.stroke();
        ctx.closePath();
    }
    
    // Draw the lawn, farm, water
    const map = () => {
        // Lawn - ABJI
        ctx.fillStyle = "#8FDA61";
        ctx.beginPath();
        ctx.moveTo(nodes['A'][0]+10, nodes['A'][1]+10);
        ctx.lineTo(nodes['B'][0]+10, nodes['B'][1]+12);
        ctx.lineTo(nodes['J'][0]-10, nodes['J'][1]+8);
        ctx.lineTo(nodes['I'][0]-10, nodes['I'][1]-5);
        ctx.lineTo(nodes['A'][0]+10, nodes['A'][1]-15);
        ctx.fill();
    
        // Farm - JFGI
        ctx.fillStyle = "#FCD08B";
        ctx.beginPath();
        ctx.moveTo(nodes['J'][0]+10, nodes['J'][1]+10);
        ctx.lineTo(nodes['F'][0]-2, nodes['F'][1]+10);
        ctx.lineTo(nodes['G'][0]-25, nodes['G'][1]-10);
        ctx.lineTo(nodes['I'][0]+12, nodes['I'][1]-10);
        ctx.lineTo(nodes['J'][0]+10, nodes['J'][1]+10);
        ctx.fill();
        
        // Water - DEF
        ctx.fillStyle = "#79EFFF";
        ctx.beginPath();
        ctx.moveTo(nodes['D'][0]+15, nodes['D'][1]+10);
        ctx.lineTo(nodes['E'][0]-9, nodes['E'][1]+7);
        ctx.lineTo(nodes['F'][0]-3, nodes['F'][1]-20);
        ctx.lineTo(nodes['D'][0]+15, nodes['D'][1]+10);
        ctx.fill();
    }
    
    // Mark the points with alphabets
    const points = () => {
        vertices.map(item => {
            ctx.font = "16px Arial";
            ctx.fillStyle = "red";
            if(item != 'D' && item != 'I') {
                var m = 1;
                if(['B','C','F','J'].includes(item)) {
                    m = -1;
                }
                ctx.fillRect(nodes[`${item}`][0]-5, nodes[`${item}`][1]-5, 10, 10);
                ctx.fillText(item, nodes[`${item}`][0]+12, nodes[`${item}`][1]+m*10);
            }
            else {
                ctx.fillRect(nodes[`${item}`][0]-5, nodes[`${item}`][1]-5, 10, 10);
                ctx.fillText(item, nodes[`${item}`][0]-10, nodes[`${item}`][1]+25);
            }
        })
    }
    
    // Draw the full map using 'init', 'map' and 'points' functions
    const draw = () => {
        init('A','B')
        init('A','I')
        init('B','C')
        init('B','J')
        init('C','D')
        init('C','J')
        init('D','E')
        init('D','F')
        init('E','F')
        init('F','G')
        init('F','J')
        init('G','I')
        init('H','I')
        init('I','J')
        points()
        map()
    }

    useEffect(() => {
        if(ctx && graph) {
            draw()
        }
    }, [ctx])

    return (
        <div>
            <canvas
                id="canvas"
                width={550}
                height={350}
            >
            </canvas>
        </div>
    )
}

export default Canvas
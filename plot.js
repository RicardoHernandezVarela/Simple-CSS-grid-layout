const yaxis = document.getElementById('y-axis');
const plot = document.querySelector('.plot');

/* Rickshaw high-frequency realtime data visualization (OPTIMIZED)*/

var updateInterval = 100;

/* Rickshaw.js initialization */
var chart2 = new Rickshaw.Graph({
    element: document.querySelector("#chart"),
    width: plot.offsetWidth,
    height: plot.offsetHeight,
    renderer: "line",
    min: "50",
    max: "700",
    series: new Rickshaw.Series.FixedDuration([{
        name: 'data',
        color: '#446CB3'
    }], undefined, {
        timeInterval: updateInterval,
        maxDataPoints: 50
    })
});

var y_axis = new Rickshaw.Graph.Axis.Y({
    graph: chart2,
    orientation: 'left',
    tickFormat: function (y) {
        return y.toFixed(2);
    },
    ticks: 5,
    element: document.getElementById('y-axis'),
});

console.log(y_axis)

/* Selección de los datos a graficar */
let ecg = [205, 63, 199, 296, 307, 394, 406, 392, 390, 279, 336, 347, 271, 285, 657, 298, 296, 250, 298, 312,
            282, 303, 320, 292, 280, 303, 285, 310, 353, 278, 328, 336, 624, 292, 311, 659, 313, 310, 366, 306,
            280, 315, 317, 321, 341, 247, 284, 327, 257, 329, 366, 322, 333, 345, 263, 272, 301, 261, 311, 340,
            347, 328, 264, 325, 306, 640, 288,311, 257, 294, 316, 656, 291, 321, 255, 308, 275, 306, 255, 311,
            364, 300, 299, 289, 213, 303, 356, 271, 332, 350,290,310,321,324,282,311,657,289,317,647,280,317,234,
            311,311,173,217,250,247,346,358,351,379,296,336,340,299,297,659,287,304,240,302,312,245,305,285,176,232,
            311,309,358,393,320,357,344,257,262,260,225,309,351, 319,356,362,390,324,659,280,290,660,289,288,658,300,
            290,311,280,330,352,295,329,329,659,304,292,276,196,261,312,274,358,387,335,348,360,280,295,306,272,294];


let inicio = 0;

/* Timer para llamar a la función cada x milisegundos*/
let ploter = setInterval(insertRandomDatapoints, updateInterval);

/* Función para obtener los datos que se grafican */
function insertRandomDatapoints() {
    for (var i = 0; i < 5; i++) {
        let tmpData = {
            data: ecg[inicio + i] // Cambiar para seleccionar ventanas de mediciones.
        };
        
        chart2.series.addData(tmpData);
    }

    chart2.configure({
        width: plot.offsetWidth * .80,
        height: plot.offsetHeight * .9
    });
    
    inicio >= ecg.length ? inicio = 0: inicio = inicio + 5;

    chart2.render();
}

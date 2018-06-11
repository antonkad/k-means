let height = 480;
let width = 640;

let pointNum = 1500;
let points = [];

let centroidsNum = 5;
let centroids = [];

let cluster = [];

let iterationNum = 5;

function setup() {
    createCanvas(width, height);

    for(let i = 0; i < pointNum; i++){
        points.push(createVector(random(0, width),random(0, height)));
    }
    initCluster();
    for(let i = 0; i < centroidsNum; i++){
        centroids.push(createVector(random(0, width),random(0, height)));
    }


    //for(let k = 0; k < iterationNum; k++){

        console.log(cluster)
    //}

}
function initCluster(){
    for(let i = 0; i < centroidsNum; i++){
        cluster[i] = [];
        cluster[i][0] = [];
        cluster[i][1] = [];
    }
}
function draw() {
    background(255);
    frameRate(60);

    initCluster();

    for(let i = 0; i < pointNum; i++){
        let dists = []
        for(let j = 0; j < centroidsNum; j++){
            dists.push(p5.Vector.dist(points[i], centroids[j]))
        }

        lowestDist = Math.min(...dists);
        cluster[dists.indexOf(lowestDist)][0].push(points[i].x);
        cluster[dists.indexOf(lowestDist)][1].push(points[i].y);

    }

    for(let i = 0; i < centroidsNum; i++){
        let average = (array) => array.reduce((a, b) => a + b) / array.length;

        let x = average(cluster[i][0]);
        let y = average(cluster[i][1]);


        centroids[i].x = x;
        centroids[i].y = y;
    }

    for(let i = 0; i < points.length ; i++ ) {
        fill(255);
        ellipse(points[i].x, points[i].y, 10, 10);
    }

    for(let i = 0; i < centroids.length ; i++ ) {
        fill(i*70, i*70, i*70);
        ellipse(centroids[i].x, centroids[i].y, 15, 15);
    }

    if(cluster.length != 0){
        for(let j = 0; j < centroidsNum; j++){
            for(let z = 0; z < cluster[j][0].length; z++){

                line(cluster[j][0][z], cluster[j][1][z], centroids[j].x, centroids[j].y);
            }
        }
    }
}

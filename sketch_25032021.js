let buildingHeight;
let buildingBase;
let buildingStartingPoint;
let measureUnit;
let canvasSize;
let building;

function setup()
{
    canvasSize = min(windowWidth, windowHeight)
    cnv = createCanvas(canvasSize, canvasSize );
    centerCanvas();
    
    measureUnit = width / 250;
    //buildingHeight = height/3;
    //buildingBase = width/12;
    //buildingStartingPoint = [-8*measureUnit, measureUnit*55];  //left side, bottom right
   /*  pointB = [buildingStartingPoint[0] - buildingBase, buildingStartingPoint[1] - 3.5*measureUnit]; //left side, bottom left
    pointC = [buildingStartingPoint[0] - buildingBase, buildingStartingPoint[1] - 3.5*measureUnit - buildingHeight]; //left side, top left
    pointD = [buildingStartingPoint[0], buildingStartingPoint[1] - buildingHeight];   //left side, top right
    pointE = [buildingStartingPoint[0] + buildingBase - 6*measureUnit, buildingStartingPoint[1] - 8*measureUnit]; //right side, bottom right
    pointF = [buildingStartingPoint[0] + buildingBase - 6*measureUnit, buildingStartingPoint[1] - 8*measureUnit - buildingHeight]; //right side, top right
    pointG = [buildingStartingPoint[0], buildingStartingPoint[1] - buildingHeight * 1.5]; //roof top
    
    // compute some middle points

    pointH = [buildingStartingPoint[0] - measureUnit*7, 0]; 
    baseData = computeLineData(pointB, buildingStartingPoint);
    pointH[1] = findPointOnLine(baseData[0], baseData[1], pointH[0], 'y');    //door bottom right
    
    pointI = [pointH[0] - measureUnit * 8, 0];
    pointI[1] = findPointOnLine(baseData[0], baseData[1], pointI[0], 'y');      //door bottom left

    pointJ = [pointH[0], pointH[1] - measureUnit * 10]; //door top right
    pointK = [pointI[0], pointI[1] - measureUnit * 10];  //door top left
    pointL1 = [(pointH[0] + pointI[0])/1.8, pointH[1] - measureUnit * 15]; //door top left
    pointL2 = [(pointH[0] + pointI[0])/2.2, pointH[1] - measureUnit * 15]; //door top right */
    building = new Building(width/12, height/3, -8, 55);
} 


function draw()
{
    background(22, 123, 56);
    
    stroke('black');
    strokeWeight(2);

    building.render();
}

class Building
{
    constructor(_base, _height, coeffStartX, coeffStartY)
    {
        this.height = _height;
        this.base = _base;
        this.buildingStartingPoint = [coeffStartX*measureUnit, coeffStartY * measureUnit];  //left side, bottom right
        this.pointB = [this.buildingStartingPoint[0] - this.base, this.buildingStartingPoint[1] - 3.5*measureUnit]; //left side, bottom left
        this.pointC = [this.buildingStartingPoint[0] - this.base, this.buildingStartingPoint[1] - 3.5*measureUnit - this.height]; //left side, top left
        this.pointD = [this.buildingStartingPoint[0], this.buildingStartingPoint[1] - this.height];   //left side, top right
        this.pointE = [this.buildingStartingPoint[0] + this.base - 6*measureUnit, this.buildingStartingPoint[1] - 8*measureUnit]; //right side, bottom right
        this.pointF = [this.buildingStartingPoint[0] + this.base - 6*measureUnit, this.buildingStartingPoint[1] - 8*measureUnit - this.height]; //right side, top right
        this.pointG = [this.buildingStartingPoint[0], this.buildingStartingPoint[1] - this.height * 1.5]; //roof top

         // compute some middle points
        let baseData = [];

        this.pointH = [this.buildingStartingPoint[0] - measureUnit*7, 0]; 
        baseData = computeLineData(this.pointB, this.buildingStartingPoint);
        this.pointH[1] = findPointOnLine(baseData[0], baseData[1], this.pointH[0], 'y');    //door bottom right
        this.pointI = [this.pointH[0] - measureUnit * 8, 0];
        this.pointI[1] = findPointOnLine(baseData[0], baseData[1], this.pointI[0], 'y');      //door bottom left
        this.pointJ = [this.pointH[0], this.pointH[1] - measureUnit * 10]; //door top right
        this.pointK = [this.pointI[0], this.pointI[1] - measureUnit * 10];  //door top left
        this.pointL1 = [(this.pointH[0] + this.pointI[0])/1.8, this.pointH[1] - measureUnit * 15]; //door top left
        this.pointL2 = [(this.pointH[0] + this.pointI[0])/2.2, this.pointH[1] - measureUnit * 15]; //door top right
        console.log("pointA = " + this.buildingStartingPoint)
        console.log("pointB = " + this.pointB)    
        console.log("pointC = " + this.pointC) 
        console.log("pointD = " + this.pointD) 
        console.log("pointE = " + this.pointE) 
        console.log("pointF = " + this.pointF)     
        console.log("pointG = " + this.pointG) 
        console.log("pointH = " + this.pointH) 
        console.log("pointI = " + this.pointI) 
        console.log("pointJ = " + this.pointJ)    
    }

    render()
    {
        stroke('black');
        strokeWeight(2);

        push();
            translate(width/2, height/2);

            fill('yellow')

            //left side of the building
            beginShape();
                vertex(this.buildingStartingPoint[0], this.buildingStartingPoint[1]);
                vertex(this.pointB[0], this.pointB[1]);
                vertex(this.pointC[0], this.pointC[1]);
                vertex(this.pointD[0], this.pointD[1]);
            endShape(CLOSE);

            //right side of the building
            beginShape();
                vertex(this.buildingStartingPoint[0], this.buildingStartingPoint[1]);
                vertex(this.pointE[0], this.pointE[1]);
                vertex(this.pointF[0], this.pointF[1]);
                vertex(this.pointD[0], this.pointD[1]);
            endShape();
            
            fill('red')
            //roof left side
            beginShape();
                vertex(this.pointC[0], this.pointC[1]);   
                vertex(this.pointG[0], this.pointG[1]);
                vertex(this.pointD[0], this.pointD[1]);
            endShape();

            //roof right side
            beginShape();
                vertex(this.pointD[0], this.pointD[1]);
                vertex(this.pointG[0], this.pointG[1]);
                vertex(this.pointF[0], this.pointF[1]);
            endShape();
            
            //door
            strokeWeight(2)
            fill('brown');
            beginShape();
                curveVertex(this.pointI[0], this.pointI[1]);
                curveVertex(this.pointI[0], this.pointI[1]);
                curveVertex(this.pointK[0], this.pointK[1]);
                curveVertex(this.pointL1[0], this.pointL1[1]);
                curveVertex(this.pointL2[0], this.pointL2[1]);
                curveVertex(this.pointJ[0], this.pointJ[1]);
            
                curveVertex(this.pointH[0], this.pointH[1]);
                curveVertex(this.pointH[0], this.pointH[1]);
            endShape();
        pop();
    }
}





function centerCanvas() 
{
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function windowResized() 
{
    canvasSize = min(windowWidth, windowHeight)
    resizeCanvas(canvasSize, canvasSize);
    centerCanvas();
}

function computeLineData(point0, point1)
{
    let m =  (point1[1]-point0[1])/(point1[0]-point0[0]);
    let q = point1[1] - m * point1[0];
    let arr = [m,q];

    return arr;
}

function findPointOnLine(angularCoefficient, intercept, inputCoord, coordToFind)
{
    if (coordToFind == 'y')
    {
        return angularCoefficient * inputCoord + intercept;
    }
    else if (coordToFind == 'x')
    {
        return (inputCoord-intercept)/angularCoefficient;
    }
}
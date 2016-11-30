


      function showmuValue(newmuValue)
      {
             //get the element
             var display = document.getElementById("initialmuValue");
             //show the amount
             display.innerHTML=newmuValue;
             mu = Number(newmuValue);
             accelTime = factor2*v1/(mu*g);
             reset();
     }


      function setGraph(newGraphValue)
      {
      		  graphType = newGraphValue;
      		  if (graphType == 1) {
      		    yAxisTitle = 'x (m)';
      		    graphTitle = 'Position vs. time';
      		    yIncrement = 0.25;
      		  }
      		  if (graphType == 2) {
      		    yAxisTitle = 'v (m/s)';
      		    graphTitle = 'Velocity vs. time';
      		    yIncrement = 0.25;
      		  }
              reset();
     }

      function setShape(newShapeValue)
      {
      		  shapeType = newShapeValue;
      		  if (shapeType == 1) {
      		    simTitle = 'Bowling Ball (Uniform sphere)';
                factor1 = 5.0/2.0;
                factor2 = 2.0/7.0;
                accelTime = factor2*v1/(mu*g);
                shapeColor = '#ff9900';
      		  }
      		  if (shapeType == 2) {
      		    simTitle = 'Uniform Disk'
                factor1 = 2.0;
                factor2 = 1.0/3.0;
                accelTime = factor2*v1/(mu*g);
                shapeColor = '#bb6633';
      		  }
      		  if (shapeType == 3) {
      		    simTitle = 'Hollow Sphere'
                factor1 = 3.0/2.0;
                factor2 = 2.0/5.0;
                accelTime = factor2*v1/(mu*g);
                shapeColor = '#bb99ff';
      		  }
              reset();
     }


      function play() {
        window.clearTimeout(timer);
        runFlag = 1;
        runMotion();

      }

      function pause() {
        window.clearTimeout(timer);
        runFlag = 0;

      }

      function stepForward() {
        window.clearTimeout(timer);
        runFlag = 1;
        drawMotion();

      }

      function stepBack() {
        window.clearTimeout(timer);
        index = index-2;
        if (index < -1) index = -1;
        time = index/20;
        if (x1 >= (xBase+400)) x1 = xBase + 400;
        if (x1 < xBase) x1 = xBase;
        runFlag = 1;
        drawMotion();

      }


      function reset() {
        window.clearTimeout(timer);
        index = -1;
        time = 0.0;
        x1 = xBase + 120;
        theta = 0.0;
        a1 = 0.0;
        v1 = 1.0;
        maxTime = 50;

        runFlag = 1;
        drawMotion();

      }


      var canvas = document.getElementById("myCanvas");
      var context = canvas.getContext("2d");
      var index = -1;
      var xBase = 180;
      var yBase = 260;
      var xBase2 = 180;
      var yBase2 = 50;
      var xInit = 37;
      var graphType = 1;
      var simTitle = 'Bowling Ball (Uniform sphere)';
      var graphTitle = 'Position vs. time';
      var yAxisTitle = 'x (m)';
      var slope = 0.4;
      var yIncrement = 0.25;
      var xIncrement = 0.15;
      var yNumDecimals = 2;
      var plotColor = '#ff00ff';
      var radius = 6;
      var maxTime = 32.0;
      var x1Init = 0;
      var x1 = xBase;
      var v1 = 1.0;
      var a1 = 0.0
      var y1 = yBase + 24;
      var x2Init = 0.0;
      var x2 = xBase-100;
      var v2 = 5.0;
      var v2Current = v2;
      var a2 = 0.0
      var y2 = yBase + 40;
      var v3 = 2.0;
      var omega = 0.0;
      var theta = 0.0;
      var mu = 0.1;
      var g = 10.0;
      var factor1 = 5.0/2.0;
      var factor2 = 2.0/7.0;
      var accelTime = factor2*v1/(mu*g);
      var R = 0.09;
      var shapeColor = '#ff9900';
      var time = 0.0;
      var timer;
      var runFlag = 1;

      drawMotion();

    function drawMotion() {

//    console.log("In the drawMotion function, with runFlag = " + runFlag );

      if ((x1 >= (xBase+400)) || (x1 < xBase)  || (time >= 50)) runFlag = 0;

//    console.log("In the drawMotion function, with runFlag = " + runFlag + " xBase = " + xBase + " x2 = " + x2 + " time = " + time);

      if (runFlag == 1) {    //      run if runFlag equal 1, not if equal 0
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        index = index + 1;

        // set background color for the entire thing
           context.fillStyle = "#ffd";
           context.fillRect(0, 0, canvas.width, canvas.height);


        // set background color for the graph
           context.fillStyle = "#eff";
           context.fillRect(xBase2, yBase2, 400, 160);

        // set line color
           context.strokeStyle = '#999';
           context.lineWidth = 2;

           var axisLabel = '';
           var axisValue = 0;

         // vertical grid lines
         for (var i = 0; i <= 10; i++) {
           context.beginPath();
           context.moveTo(xBase2+40*i, yBase2);
           context.lineTo(xBase2+40*i, yBase2+170);
           context.stroke();
           context.font = '14pt Calibri';
           context.fillStyle = 'black';
           context.textAlign = 'center';
           context.textBaseline = 'middle';
           axisValue = xIncrement*i;
           axisLabel = axisValue.toFixed(2);
           context.fillText(axisLabel, xBase2+40*i, yBase2+180);
          }

         // horizontal grid lines
         for (i = 0; i <= 4; i++) {
           context.beginPath();
           context.moveTo(xBase2-10, yBase2+40*i);
           context.lineTo(xBase2+400, yBase2+40*i);
           context.stroke();
           context.font = '14pt Calibri';
           context.fillStyle = 'black';
           context.textAlign = 'center';
           context.textBaseline = 'middle';
 //          axisValue = 20*(4-i);
           if (graphType == 1) axisValue = yIncrement*(4-i);
           if (graphType == 2) axisValue = yIncrement*(4-i);
           axisLabel = axisValue.toFixed(yNumDecimals);
           context.fillText(axisLabel, xBase2-24, yBase2+40*i);

          }

         // x-axis
           context.strokeStyle = '#000';
           context.lineWidth = 4;
           context.beginPath();
           context.moveTo(xBase2-1, yBase2+160);
           context.lineTo(xBase2+420, yBase2+160);
           context.stroke();
           context.moveTo(xBase2+410, yBase2+160-6);
           context.lineTo(xBase2+420, yBase2+160);
           context.lineTo(xBase2+410, yBase2+160+6);
           context.lineJoin = 'miter';
           context.stroke();
           context.font = '16pt Calibri';
           context.fillStyle = 'black';
           context.textAlign = 'left';
           context.fillText('t (s)', xBase2+428, yBase2+160);

         // y-axis
           context.strokeStyle = '#000';
           context.beginPath();
           context.moveTo(xBase2, yBase2-20);
           context.lineTo(xBase2, yBase2+160);
           context.stroke();
           context.moveTo(xBase2-6, yBase2-10);
           context.lineTo(xBase2, yBase2-20);
           context.lineTo(xBase2+6, yBase2-10);
           context.lineJoin = 'miter';
           context.stroke();
           context.strokeStyle = '#000';
           context.textAlign = 'center';
           context.fillText(yAxisTitle, xBase2-40, 20);

        // draw graph

           if (graphType == 1) {
             context.strokeStyle = "blue";
             context.lineWidth = 4;
             context.beginPath();
             context.moveTo(xBase2, yBase2+160);
             for (var ival = 1; ival <=index; ival++) {
               if ((ival/200.0) < 0.4) context.lineTo(xBase2+0.2*ival/xIncrement, yBase2+160-160*(v1)*ival/200);
               else {
                 if ((ival/200.0) < (0.4+accelTime)) context.lineTo(xBase2+0.2*ival/xIncrement, yBase2+160-160*(v1)*0.4-160*(v1-0.5*mu*g*((ival/200)-0.4))*((ival/200)-0.4));
                 else context.lineTo(xBase2+0.2*ival/xIncrement, yBase2+160-160*(v1)*0.4-160*(v1-0.5*mu*g*(accelTime))*(accelTime)-160*(v1-mu*g*accelTime)*((ival/200)-0.4-accelTime));
               }
             }
             context.stroke();

           }
           else {
             context.strokeStyle = "red";
             context.lineWidth = 4;
             context.beginPath();
             context.moveTo(xBase2, yBase2);
             for (var ival = 1; ival <=index; ival++) {
               if ((ival/200.0) < 0.4) context.lineTo(xBase2+0.2*ival/xIncrement, yBase2+160-(v1)*160);
               else {
                 if ((ival/200.0) < (0.4+accelTime)) context.lineTo(xBase2+0.2*ival/xIncrement, yBase2+160-(v1-mu*g*(((ival/200)-0.4)))*160);
                 else context.lineTo(xBase2+0.2*ival/xIncrement, yBase2+160-(v1-mu*g*((accelTime)))*160);
               }
             }
             context.stroke();

             context.beginPath();
             if ((ival/200.0) < 0.4)  context.arc(xBase2+0.2*index/xIncrement, yBase2+160-(v1)*160, radius, 0, 2 * Math.PI, false);
             else {
                 if ((ival/200.0) < (0.4+accelTime)) context.arc(xBase2+0.2*index/xIncrement, yBase2+160-(v1-mu*g*(((ival/200)-0.4)))*160, radius, 0, 2 * Math.PI, false);
                 else context.arc(xBase2+0.2*index/xIncrement, yBase2+160-(v1-mu*g*((accelTime)))*160, radius, 0, 2 * Math.PI, false);
                }
             context.fillStyle = "red";
             context.fill();
             context.lineWidth = 1;
             context.strokeStyle = '#000000';
             context.stroke();

             context.strokeStyle = "#00bb00";
             context.lineWidth = 3;
             context.beginPath();
             context.moveTo(xBase2, yBase2+160);
             for (var ival = 1; ival <=index; ival++) {
               if ((ival/200.0) < 0.4) context.lineTo(xBase2+0.2*ival/xIncrement, yBase2+160);
               else {
                 if ((ival/200.0) < (0.4+accelTime)) context.lineTo(xBase2+0.2*ival/xIncrement, yBase2+160-(factor1*mu*g*((ival/200)-0.4))*160);
                 else context.lineTo(xBase2+0.2*ival/xIncrement, yBase2+160-(factor1*mu*g*(accelTime))*160);
               }
             }
             context.stroke();

             context.beginPath();
             if ((ival/200.0) < 0.4)  context.arc(xBase2+0.2*index/xIncrement, yBase2+160, radius-2, 0, 2 * Math.PI, false);
             else {
                 if ((ival/200.0) < (0.4+accelTime)) context.arc(xBase2+0.2*index/xIncrement, yBase2+160-(factor1*mu*g*((ival/200)-0.4))*160, radius-2, 0, 2 * Math.PI, false);
                 else context.arc(xBase2+0.2*index/xIncrement, yBase2+160-(factor1*mu*g*(accelTime))*160, radius-2, 0, 2 * Math.PI, false);
                }
             context.fillStyle = "#00bb00";
             context.fill();
             context.lineWidth = 2;
             context.strokeStyle = '#000000';
             context.stroke();

             context.fillStyle = "#eff";
             context.fillRect(xBase2+4, yBase2+10, 90, 20);
             context.fillRect(xBase2+4, yBase2+130, 90, 20);
             context.font = '16pt Calibri';
             context.fillStyle = 'red';
             context.fillText("translational", xBase2+58, yBase2+20);
             context.fillStyle = '#00bb00';
             context.fillText("rotational", xBase2+52, yBase2+140);


           }

// Back to xBase, yBase

        // set line color
           context.strokeStyle = '#999';
           context.lineWidth = 2;

           axisLabel = '';
           axisValue = 0;

         // vertical grid lines
         for (var i = 0; i <= 10; i++) {
           context.beginPath();
           context.moveTo(xBase+40*i, yBase+50);
           context.lineTo(xBase+40*i, yBase+70);
           context.stroke();
           context.font = '14pt Calibri';
           context.fillStyle = 'black';
           context.textAlign = 'center';
           context.textBaseline = 'middle';
           axisValue = 0.1*i;
           axisLabel = axisValue.toFixed(1);
           context.fillText(axisLabel, xBase+40*i, yBase+80);
          }

         // x-axis
           context.strokeStyle = '#6ff';
           context.lineWidth = 4;
           context.beginPath();
           context.moveTo(xBase-1, yBase+60);
           context.lineTo(xBase+416, yBase+60);
           context.stroke();

           context.strokeStyle = 'black';
           context.beginPath();
           context.moveTo(xBase+160, yBase+60);
           context.lineTo(xBase+416, yBase+60);
           context.stroke();

           context.strokeStyle = '#000';
           context.moveTo(xBase+406, yBase+60-6);
           context.lineTo(xBase+416, yBase+60);
           context.lineTo(xBase+406, yBase+60+6);
           context.lineJoin = 'miter';
           context.stroke();
           context.font = '16pt Calibri';
           context.fillStyle = 'black';
           context.textAlign = 'left';
           context.fillText('x (m)', xBase+420, yBase+59);



        // draw motion diagrams

           time = index/200.0;
           var numGhosts = Math.round(0.5*time+0.5);


           if (2 > 1) {
             context.fillStyle = shapeColor;
             context.lineWidth = 1;
             context.strokeStyle = '#000000';

             x1 = xBase + 400*(x1Init +(v1)*time);
             if (time > 0.4) {
               a1 = -mu*g;
               x1 = xBase + 160 + 400*(v1+0.5*a1*(time-0.4))*(time-0.4);
               theta = 0.5*factor1*mu*g*(time-0.4)*(time-0.4)/R;
               if (time > (0.4+accelTime)) {
                 x1 = xBase + 160 + 400*(v1+0.5*a1*(accelTime))*(accelTime) + 400*(v1+a1*(accelTime))*(time-0.4-accelTime);
                 theta = (0.5*factor1*mu*g*(accelTime)*(accelTime)/R)+(factor1*mu*g/(R))*(accelTime)*(time-0.4-accelTime);

               }
             }
             if (x1 > (xBase+400)) x1 = xBase + 400;

             context.beginPath();
             context.arc(x1, y1, 6*radius, 0, 2 * Math.PI, false);
             context.fill();
             context.stroke();

            context.beginPath();
            context.moveTo(x1+6*radius*Math.sin(theta), y1-6*radius*Math.cos(theta));
            context.lineTo(x1-6*radius*Math.sin(theta), y1+6*radius*Math.cos(theta));
            context.stroke();
            context.beginPath();
            context.moveTo(x1-6*radius*Math.cos(theta), y1-6*radius*Math.sin(theta));
            context.lineTo(x1+6*radius*Math.cos(theta), y1+6*radius*Math.sin(theta));
            context.stroke();

// draw the stationary version, for the free-body diagram

             context.beginPath();
             context.arc(x2, y1, 6*radius, 0, 2 * Math.PI, false);
             context.fill();
             context.stroke();

            context.beginPath();
            context.moveTo(x2+6*radius*Math.sin(theta), y1-6*radius*Math.cos(theta));
            context.lineTo(x2-6*radius*Math.sin(theta), y1+6*radius*Math.cos(theta));
            context.stroke();
            context.beginPath();
            context.moveTo(x2-6*radius*Math.cos(theta), y1-6*radius*Math.sin(theta));
            context.lineTo(x2+6*radius*Math.cos(theta), y1+6*radius*Math.sin(theta));
            context.stroke();

            drawArrow(0,-14,x2,y1+10,1.5*3.1416,"#00bb00");
            drawArrow(0,14,x2,y1-10,0.5*3.1416,"blue");
            if ((time > 0.4) && (time < (0.4+accelTime))) {
              drawArrow(-60*mu,0,x2,y1+6*radius,1.0*3.1416,"#bb00bb");
              context.font = '16pt Calibri';
              context.fillStyle = "#bb00bb";
              context.fillText("F", x2 - 30, y1+48);
              context.font = '12pt Calibri';
              context.fillText("K", x2 - 21, y1+57);
            }
            context.font = '16pt Calibri';
            context.fillStyle = "#00bb00";
            context.fillText("mg", x2 + 10, y1+48);
            context.fillStyle = "blue";
            context.fillText("F", x2 + 10, y1-46);
            context.font = '12pt Calibri';
            context.fillText("N", x2 + 19, y1-39);


           }

           // graph title
           context.font = 'bold 16pt Calibri';
           context.fillStyle = 'purple';
           context.textAlign = 'center';
           context.fillText(simTitle, 40+(canvas.width)/2, 12);

           context.font = '16pt Calibri';
           context.fillStyle = 'black';
           context.fillText(graphTitle, 40+(canvas.width)/2, 36);


        var timeLabel = 't = ';
        timeLabel = timeLabel + time.toFixed(3) + ' s';
        context.textAlign = 'left';
        context.fillText(timeLabel, xBase-60, 370);

        context.fillStyle = '#bb6600';
        var xPos = (x1Init +(v1)*time + 0.5*a1*time*time);
        if (time > 0.4) {
          xPos = 0.4 + (v1-0.5*mu*g*(time-0.4))*(time-0.4);
          if (time > (0.4+accelTime)) {
            xPos = 0.4 + (v1-0.5*mu*g*(accelTime))*(accelTime) + (v1-mu*g*(accelTime))*(time-0.4-accelTime);
          }
        }
        if (xPos > 1.0) xPos = 1.0;

        var xPosLabel = 'x = ';
        xPosLabel = xPosLabel + xPos.toFixed(3) + ' m';
        context.textAlign = 'left';
        context.fillText(xPosLabel, xBase+60, 370);

        var velocity = v1 + a1*time;
        if (time > 0.4) {
          velocity = v1 -mu*g*(time-0.4);
          if (time > (0.4+accelTime)) {
            velocity = v1 -mu*g*(accelTime);
          }
        }
        var velocityLabel = 'v = ';
        velocityLabel = velocityLabel + velocity.toFixed(3) + ' m/s';
        context.textAlign = 'left';
        context.fillText(velocityLabel, xBase+180, 370);

        var rotationalvelocity = 0.0;
        if (time > 0.4) {
          rotationalvelocity = factor1*mu*g*(time-0.4);
          if (time > (0.4+accelTime)) {
            rotationalvelocity = factor1*mu*g*(accelTime);
          }
        }
        var rotationalvelocityLabel = 'wR = ';
        rotationalvelocityLabel = rotationalvelocityLabel + rotationalvelocity.toFixed(3) + ' m/s';
        context.textAlign = 'left';
        context.fillText(rotationalvelocityLabel, xBase+320, 370);

      }
    }

    function runMotion() {
        drawMotion();
        if (runFlag == 1) {
          timer = window.setTimeout(runMotion, 1000/30);
        }
      }

    function drawArrow(Fx,Fy,Px,Py,theta, arrowColor) {
           context.strokeStyle = arrowColor;
           context.lineWidth = 4;
           context.beginPath();
           context.moveTo(Px, Py);
           context.lineTo(Px+5*Fx,Py-5*Fy);
 //          context.lineTo(120+50*Fx*Math.cos(theta)+10*F*Math.cos(theta+(3.1416/2))-2*F*Math.cos(theta+0.7*(3.1416/2)),170-50*Fx*Math.sin(theta)-10*F*Math.sin(theta+(3.1416/2))+2*F*Math.sin(theta+0.7*(3.1416/2)));
           context.stroke();

           context.lineWidth = 2;

           var Fmag = Math.sqrt(Fx*Fx+Fy*Fy);
           if (Fmag > 5) Fmag = 5;

           context.beginPath();
           context.moveTo(Px+5*Fx,Py-5*Fy);
           context.lineTo(Px+5*Fx-4*Fmag*Math.cos(theta+0.25*(3.1416/2)),Py-5*Fy+4*Fmag*Math.sin(theta+0.25*(3.1416/2)));
           context.stroke();

           context.beginPath();
           context.moveTo(Px+5*Fx,Py-5*Fy);
           context.lineTo(Px+5*Fx-4*Fmag*Math.cos(theta-0.25*(3.1416/2)),Py-5*Fy+4*Fmag*Math.sin(theta-0.25*(3.1416/2)));
           context.stroke();

    }



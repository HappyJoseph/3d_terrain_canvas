import React, {createRef, useEffect} from 'react';
import { inject } from 'mobx-react';

const Terrain2d = inject("yourStore")((props) => {
  var {setCoor, reset} = props.yourStore;

  let canvas;
  let canvasRef = createRef();

  let pos = {
    drawable : false,
    x: -1, 
    y: -1
  }

  let ctx;
  const size = 400;
  let data = new Array(size * size);
  for (var i = 0; i < data.length; i++){
    data[i] = 0;
  }

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseout', finishDraw);
    return () => {
      canvas.removeEventListener('mousedown', initDraw);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', finishDraw);
      canvas.removeEventListener('mouseout', finishDraw);
    }
  }, []);

  const initDraw = (e) => {
    ctx.beginPath();
    pos = {drawable : true, ...getPosition(e)};
    ctx.moveTo(pos.x, pos.y);
  }

  const draw = (e) => {
    if (pos.drawable) {
      pos = {...pos, ...getPosition(e)};
      var circle = new Path2D();
      circle.moveTo(pos.x, pos.y);
      circle.arc(pos.x, pos.y, 25, 0, 2 * Math.PI);
      ctx.fill(circle);
      setCoor(pos.x, pos.y);
    }
  }

  const finishDraw = (e) => {
    pos = {drawable: false, x: -1, y: -1};
  }

  const getPosition = (e) => {
    return {x: e.offsetX, y: e.offsetY};
  }

  const clearCanvas = (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    reset(true);
  }

  return (
    <div>
      <button onClick={clearCanvas} style={{position : 'absolute', transform:'translateX(-190px)', top : '260px'}}>Reset</button>
      <div>
        <canvas ref={canvasRef} width="400px" height={"400px"} style={{border: "2mm ridge rgba(170, 50, 220, .6)"}}/>
      </div>
    </div>
  )
})

export default Terrain2d;
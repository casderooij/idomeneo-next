import { useEffect } from 'react';

import BackgroundCanvas from '../lib/background-canvas';

export default function Background() {
  let backgroundCanvas;

  useEffect(() => {
    backgroundCanvas = new BackgroundCanvas();

    return () => {
      backgroundCanvas.removeMesh();
    }
  }, []);

  return (
    <>
      <canvas id="source-canvas" className="hidden"></canvas>

      <div className="w-screen h-screen fixed flex justify-center items-center z-neg-10 bg-black">
        <canvas
          id="background-canvas"
          className="block -mt-6 md:mt-0"
        ></canvas>
      </div>
    </>
  );
}
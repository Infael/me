import { FC, useCallback, useEffect, useRef } from "react";

interface CanvasProps {
  update: (delta: number) => void;
  draw: (ctx: CanvasRenderingContext2D, lagOffset: number) => void;
  fps?: number;
}

export const Canvas: FC<CanvasProps> = ({ update, draw, fps = 60 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      const context = canvas.getContext("2d");
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      if (context) context.scale(ratio, ratio);
    }
  };

  const predraw = useCallback(
    (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      context.save();
      resizeCanvasToDisplaySize(canvas);
      const { width, height } = context.canvas;
      context.clearRect(0, 0, width, height);
    },
    []
  );

  const postdraw = useCallback((context: CanvasRenderingContext2D) => {
    context.restore();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // frame duration in milliseconds
    const frameDuration = 1000 / fps;
    // start time
    let start = Date.now();
    // lag offset in milliseconds
    let lag = 0;

    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);

      // calculate the elapsed time since the last frame
      const current = Date.now();
      const elapsed = current - start;
      start = current;
      lag += elapsed;

      // update the game logic as many times as needed
      while (lag >= frameDuration) {
        update(frameDuration);
        lag -= frameDuration;
      }

      // render the game state
      const lagOffset = lag / frameDuration;

      predraw(ctx, canvas);
      draw(ctx, lagOffset);
      postdraw(ctx);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [update, draw, predraw, postdraw, fps]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};


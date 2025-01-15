import React, { ReactElement, useContext, useState, useEffect } from 'react'
import { UserPositionContext } from '../context/UserPositionProvider';
import { SpaceContext } from '../context/SpaceProvider';

function Space(): ReactElement {
  const {size, capacity } = useContext(SpaceContext);
  const [jiggleOnce, setJiggleOnce] = useState(false);
  const userPosition = useContext(UserPositionContext);

  useEffect(() => {
    if (jiggleOnce) {
      const timer = setTimeout(() => setJiggleOnce(false), 500); // Reset after animation duration
      return () => clearTimeout(timer);
    }
  }, [jiggleOnce]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if ((userPosition?.position?.x ?? 0) > 0) {
            userPosition?.setPosition?.((prev: any) => ({ ...prev, x: Math.max(prev.x - 1, 0) }));
          } else {
            setJiggleOnce(true);
          }
          break;
        case 'ArrowDown':
          if ((userPosition?.position?.x ?? 0) < size - 1) {
            userPosition?.setPosition?.((prev: any) => ({ ...prev, x: Math.min(prev.x + 1, size - 1) }));
          } else {
            setJiggleOnce(true);
          }
          break;
        case 'ArrowLeft':
          if ((userPosition?.position?.y ?? 0) > 0) {
            userPosition?.setPosition?.((prev: any) => ({ ...prev, y: Math.max(prev.y - 1, 0) }));
          } else {
            setJiggleOnce(true);
          }
          break;
        case 'ArrowRight':
          if ((userPosition?.position?.y ?? 0) < size - 1) {
            userPosition?.setPosition?.((prev: any) => ({ ...prev, y: Math.min(prev.y + 1, size - 1) }));
          } else {
            setJiggleOnce(true);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userPosition, size]);

  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

  return (
    <>
    <h1 className="text-2xl font-bold">Space - {capacity}</h1>
    <div className={`grid gap-0.5 ${jiggleOnce ? 'animate-shake' : ''}`} style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` }}>
      {grid.map((row, i) => (
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className={`w-5 h-5 ${userPosition?.position.x === i && userPosition?.position.y === j ? 'bg-green-500' : 'bg-white'} border border-gray-500`}
          ></div>
        ))
      ))}
    </div>
    
    
</>
  )
}

export default Space;

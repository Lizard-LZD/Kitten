import React, { useState, useEffect, useRef } from 'react';
import './Cursor_Kitten.css';

export default function Cursor_Kitten() {
  let prevX = 0;
  let prevY = 0;

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: 0,
  });

  const Cursor_Kitten = useRef(null);

  const handleMouseMove = (event) => {
    const { mouseX, mouseY } = positionRef.current;
    positionRef.current.mouseX = event.clientX;
    positionRef.current.mouseY = event.clientY;

    Cursor_Kitten.current.classList.remove('left', 'right', 'front', 'back');

    if (Math.abs((prevX - mouseX) / prevX) > Math.abs((prevY - mouseY) / prevY)) {
      if (mouseX < prevX) {
        Cursor_Kitten.current.classList.add('left');
      } else if (mouseX > prevX) {
        Cursor_Kitten.current.classList.add('right');
      }
    } else {
      if (mouseY < prevY) {
        Cursor_Kitten.current.classList.add('back');
      } else if (mouseY > prevY) {
        Cursor_Kitten.current.classList.add('front');
      }
    }

    prevX = mouseX;
    prevY = mouseY;
  };

  const checkStillCursor_Kitten = () => {
    const { mouseX, mouseY, destinationX, destinationY } = positionRef.current;
    const dx = mouseX - destinationX;
    const dy = mouseY - destinationY;

    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      Cursor_Kitten.current.classList.remove('left', 'right', 'front', 'back');
    }}

  useEffect(() => {

    const followMouse = () => {
      
      positionRef.current.key = requestAnimationFrame(followMouse);

      const { mouseX, mouseY, destinationX, destinationY } = positionRef.current;

      // Calculate the distance between the current and destination coordinates
      const distanceX = mouseX - destinationX;
      const distanceY = mouseY - destinationY;

      // Set the destination coordinates with a small delay
      if (Math.abs(distanceX) > 1 || Math.abs(distanceY) > 1) {
        positionRef.current.destinationX += distanceX * 0.1;
        positionRef.current.destinationY += distanceY * 0.1;
      }

      // Smoothly update the Cursor_Kitten position
      const ease = 0.1;
      const dx = destinationX - Cursor_Kitten.current.offsetLeft;
      const dy = destinationY - Cursor_Kitten.current.offsetTop;
      const vx = dx * ease;
      const vy = dy * ease;

      Cursor_Kitten.current.style.left = `${Cursor_Kitten.current.offsetLeft + vx}px`;
      Cursor_Kitten.current.style.top = `${Cursor_Kitten.current.offsetTop + vy}px`;

    };

    window.addEventListener('mousemove', handleMouseMove);
    followMouse();
    const stillCursor_KittenTimer = setInterval(checkStillCursor_Kitten, 500); // Adjust the interval as needed

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(stillCursor_KittenTimer);
      cancelAnimationFrame(positionRef.current.key);

    };
  }, []);

  return <div className="Cursor_Kitten" ref={Cursor_Kitten} />;
}

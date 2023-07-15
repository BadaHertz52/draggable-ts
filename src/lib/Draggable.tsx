import React, {
  ReactNode,
  useRef,
  RefObject,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import styles from "./Draggable.module.css";
import { debounce } from "underscore";
type DraggableProps = {
  children: ReactNode;
  x: number;
  y: number;
  onMove?: () => void;
};
function Draggable({ children, x, y, onMove }: DraggableProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const [moving, setMoving] = useState<boolean>(false);
  /**
   * draggable 내에서의 마우스의 x좌표
   */
  const initialX = useRef<number>(0);
  /**
   * draggable 내에서의 마우스의 y좌표
   */
  const initialY = useRef<number>(0);
  type PositionType = {
    x: number;
    y: number;
  };
  const [position, setPosition] = useState<PositionType>({ x: x, y: y });
  const Move = useMemo(
    () =>
      debounce(() => {
        onMove && onMove();
      }, 50),
    [onMove]
  );
  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (moving) {
        const newPosition: PositionType = {
          x: event.clientX - initialX.current,
          y: event.clientY - initialY.current,
        };

        setPosition(newPosition);
        Move();
      }
    },
    [moving, Move]
  );

  const removeEvents = useCallback(() => {
    setMoving(false);
  }, []);

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (dragRef.current) {
        const { left, top } = dragRef.current.getBoundingClientRect();
        initialX.current = event.clientX - left;
        initialY.current = event.clientY - top;
        setMoving(true);
      }
    },
    [dragRef, setMoving]
  );

  return (
    <div
      ref={dragRef}
      className={styles.draggable}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={removeEvents}
      onMouseLeave={removeEvents}
    >
      {children}
    </div>
  );
}

export default Draggable;

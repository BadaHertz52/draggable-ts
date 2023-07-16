import React, {
  ReactNode,
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import styles from "./style.module.scss";
import { debounce } from "underscore";
import BtnChanger from "../BtnChanger";
export type SaveDataProps = {
  id: string;
  x: number;
  y: number;
  zIndex: number;
};
export type DraggableProps = {
  id: string;
  children: ReactNode;
  x: number;
  y: number;
  /**
   * 위치, zIndex 변경시, 변경사항을 props로 받아서 활용할 수 있는 함수
   * @param props
   * @returns
   */
  saveData?: (props: SaveDataProps) => void;
  opacity?: number;
  zIndex?: number;
};
function Draggable({
  id,
  children,
  x,
  y,
  saveData,
  opacity = 1,
  zIndex = 0,
}: DraggableProps) {
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
  const [styleZIndex, setStyleZIndex] = useState<number>(zIndex);
  const [showBtnChanger, setShowBtnChanger] = useState<boolean>(false);
  const Move = useMemo(
    () =>
      debounce((x: number, y: number) => {
        const props: SaveDataProps = {
          id: id,
          x: x,
          y: y,
          zIndex: styleZIndex,
        };
        saveData && saveData(props);
      }, 50),
    [saveData, id, styleZIndex]
  );
  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (moving) {
        const newPosition: PositionType = {
          x: event.clientX - initialX.current,
          y: event.clientY - initialY.current,
        };

        setPosition(newPosition);
        Move(newPosition.x, newPosition.y);
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
  const handleMouseLeave = () => {
    removeEvents();
    setShowBtnChanger(false);
  };
  useEffect(() => {
    if (saveData)
      saveData({ id: id, x: position.x, y: position.y, zIndex: styleZIndex });
  }, [styleZIndex, saveData, id, position]);
  return (
    <div
      id={id}
      ref={dragRef}
      className={`draggable ${styles.draggable}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: moving ? opacity : 1,
        zIndex: styleZIndex,
      }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={removeEvents}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setShowBtnChanger(true)}
    >
      <BtnChanger
        show={showBtnChanger}
        dragRef={dragRef}
        setStyleZIndex={setStyleZIndex}
      />
      <div>{children}</div>
    </div>
  );
}

export default React.memo(Draggable);

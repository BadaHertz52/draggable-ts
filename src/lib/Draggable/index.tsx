import React, {
  ReactNode,
  useRef,
  useCallback,
  useState,
  useMemo,
  RefObject,
} from "react";
import "./style.scss";
import { debounce } from "underscore";
import BtnChanger from "../BtnChanger";
export type SaveDataParams = {
  id: string; // Draggable id
  x: number;
  y: number;
  zIndex: number;
};
export type DraggableProps = {
  id: string;
  children: ReactNode;
  draggableGroupRef: RefObject<HTMLDivElement>;
  x: number;
  y: number;
  /**
   * 위치 또는 zIndex 변경시, 변경사항를 받아서 활용할 수 있는 함수
   * @param props
   * @returns
   */
  saveData?: (props: SaveDataParams) => void;
  opacity?: number;
  zIndex?: number;
  isBtnChanger?: boolean;
};
function Draggable({
  id,
  children,
  draggableGroupRef,
  x,
  y,
  saveData,
  opacity = 1,
  zIndex = 0,
  isBtnChanger = true,
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
        const props: SaveDataParams = {
          id: id,
          x: x,
          y: y,
          zIndex: styleZIndex,
        };
        saveData && saveData(props);
      }, 50),
    [saveData, id, styleZIndex]
  );
  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (moving && draggableGroupRef.current && dragRef.current) {
        const parentDOMRect = draggableGroupRef.current.getBoundingClientRect();
        const newX = event.clientX - initialX.current - parentDOMRect.x;
        const newY = event.clientY - initialY.current - parentDOMRect.y;

        const newPosition: PositionType = {
          x:
            newX < 0
              ? 0
              : newX + dragRef.current.clientWidth >= parentDOMRect.width
              ? parentDOMRect.width - dragRef.current.clientWidth
              : newX,
          y:
            newY < 0
              ? 0
              : newY + dragRef.current.clientHeight >= parentDOMRect.height
              ? parentDOMRect.height - dragRef.current.clientHeight
              : newY,
        };

        setPosition(newPosition);
        Move(newPosition.x, newPosition.y);
      }
    },
    [moving, Move, draggableGroupRef]
  );

  const handleMouseDown = useCallback(
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
  const handleMouseUp = useCallback(() => {
    setMoving(false);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setMoving(false);
    isBtnChanger && setShowBtnChanger(false);
  }, [isBtnChanger]);

  const handleMouseEnter = useCallback(() => {
    isBtnChanger && setShowBtnChanger(true);
  }, [isBtnChanger]);
  return (
    <div
      id={id}
      ref={dragRef}
      className="draggable"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: moving ? opacity : 1,
        zIndex: styleZIndex,
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {isBtnChanger && (
        <BtnChanger
          show={showBtnChanger}
          dragRef={dragRef}
          setStyleZIndex={setStyleZIndex}
          saveDataParmas={{
            id: id,
            x: position.x,
            y: position.y,
            zIndex: styleZIndex,
          }}
          saveData={saveData}
        />
      )}
      <div>{children}</div>
    </div>
  );
}

export default React.memo(Draggable);

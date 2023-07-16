import React, {
  useState,
  RefObject,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import styles from "./style.module.scss";
type BtnChangerProps = {
  dragRef: RefObject<HTMLDivElement>;
  setStyleZIndex: Dispatch<SetStateAction<number>>;
  show: boolean;
};
function BtnChanger({ dragRef, setStyleZIndex, show }: BtnChangerProps) {
  const FRONT = "front";
  const BACK = "back";
  type Direction = typeof FRONT | typeof BACK;
  const findZIndex = useCallback((direction: Direction) => {
    if (dragRef.current) {
      const targetZIndex = +dragRef.current.style.zIndex;
      const { top, bottom, left, right } =
        dragRef.current.getBoundingClientRect();
      const draggableElements = document.querySelectorAll(
        ".draggable"
      ) as NodeListOf<HTMLElement>;
      let zIndexArray: number[] | undefined;
      for (let i = 0; i < draggableElements.length; i++) {
        const element = draggableElements[i];
        const elementZIndex = +element.style.zIndex;
        if (dragRef.current === element) continue;
        // direction 별로, 대상이 되지 않는 element 거르기
        if (direction === FRONT && elementZIndex < targetZIndex) continue;
        if (direction === BACK && elementZIndex > targetZIndex) continue;
        const otherRect = element.getBoundingClientRect();
        const condition1_X = left <= otherRect.left && right >= otherRect.left;
        const condition1_Y = top <= otherRect.top && bottom >= otherRect.top;
        const condition2_X =
          otherRect.right >= left && otherRect.right <= right;
        const condition2_Y =
          otherRect.bottom >= top && otherRect.bottom <= bottom;
        if ((condition1_X || condition2_X) && (condition1_Y || condition2_Y)) {
          if (zIndexArray) {
            zIndexArray.push(elementZIndex);
          } else {
            zIndexArray = [elementZIndex];
          }
        }
        if (i === draggableElements.length - 1 && zIndexArray) {
          zIndexArray.sort();
        }
      }
      return zIndexArray
        ? direction === FRONT
          ? zIndexArray.shift()
          : zIndexArray.pop()
        : null;
    }
  }, []);
  const changeZIndex = (direction: Direction) => {
    const zIndex = findZIndex(direction);
    if (typeof zIndex === "number") {
      const newZIndex = direction === FRONT ? zIndex + 1 : zIndex - 1;
      setStyleZIndex(newZIndex);
    }
  };
  return (
    <div className={show ? styles.btnChangerOn : styles.btnChanger}>
      <div className={styles.inner}>
        <button
          className={styles.btn}
          onClick={() => changeZIndex(FRONT)}
          title="move  back"
        >
          <IoMdArrowRoundBack />
        </button>
        <button
          className={styles.btn}
          onClick={() => changeZIndex(BACK)}
          title="move front"
        >
          <IoMdArrowRoundForward />
        </button>
      </div>
    </div>
  );
}

export default React.memo(BtnChanger);

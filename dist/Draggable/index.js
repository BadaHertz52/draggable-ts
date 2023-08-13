import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useCallback, useState, useMemo, } from "react";
import "./style.scss";
import { debounce } from "underscore";
import BtnChanger from "../BtnChanger";
function Draggable({ id, children, draggableGroupRef, x, y, saveData, opacity = 1, zIndex = 0, isBtnChanger = true, }) {
    const dragRef = useRef(null);
    const [moving, setMoving] = useState(false);
    /**
     * draggable 내에서의 마우스의 x좌표
     */
    const initialX = useRef(0);
    /**
     * draggable 내에서의 마우스의 y좌표
     */
    const initialY = useRef(0);
    const [position, setPosition] = useState({ x: x, y: y });
    const [styleZIndex, setStyleZIndex] = useState(zIndex);
    const [showBtnChanger, setShowBtnChanger] = useState(false);
    const Move = useMemo(() => debounce((x, y) => {
        const props = {
            id: id,
            x: x,
            y: y,
            zIndex: styleZIndex,
        };
        saveData && saveData(props);
    }, 50), [saveData, id, styleZIndex]);
    const handleMouseMove = useCallback((event) => {
        if (moving && draggableGroupRef.current && dragRef.current) {
            const parentDOMRect = draggableGroupRef.current.getBoundingClientRect();
            const newX = event.clientX - initialX.current - parentDOMRect.x;
            const newY = event.clientY - initialY.current - parentDOMRect.y;
            const newPosition = {
                x: newX < 0
                    ? 0
                    : newX + dragRef.current.clientWidth >= parentDOMRect.width
                        ? parentDOMRect.width - dragRef.current.clientWidth
                        : newX,
                y: newY < 0
                    ? 0
                    : newY + dragRef.current.clientHeight >= parentDOMRect.height
                        ? parentDOMRect.height - dragRef.current.clientHeight
                        : newY,
            };
            setPosition(newPosition);
            Move(newPosition.x, newPosition.y);
        }
    }, [moving, Move, draggableGroupRef]);
    const handleMouseDown = useCallback((event) => {
        if (dragRef.current) {
            const { left, top } = dragRef.current.getBoundingClientRect();
            initialX.current = event.clientX - left;
            initialY.current = event.clientY - top;
            setMoving(true);
        }
    }, [dragRef, setMoving]);
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
    return (_jsxs("div", { id: id, ref: dragRef, className: "draggable", style: {
            transform: `translate(${position.x}px, ${position.y}px)`,
            opacity: moving ? opacity : 1,
            zIndex: styleZIndex,
        }, onMouseMove: handleMouseMove, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onMouseLeave: handleMouseLeave, onMouseEnter: handleMouseEnter, children: [isBtnChanger && (_jsx(BtnChanger, { show: showBtnChanger, dragRef: dragRef, setStyleZIndex: setStyleZIndex, saveDataParmas: {
                    id: id,
                    x: position.x,
                    y: position.y,
                    zIndex: styleZIndex,
                }, saveData: saveData })), _jsx("div", { children: children })] }));
}
export default React.memo(Draggable);

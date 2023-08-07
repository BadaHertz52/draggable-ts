import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useCallback, useState, useMemo, } from "react";
import "./style.scss";
import { debounce } from "underscore";
import BtnChanger from "../BtnChanger";
function Draggable({ id, children, x, y, saveData, opacity = 1, zIndex = 0, }) {
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
    const onMouseMove = useCallback((event) => {
        if (moving) {
            const newPosition = {
                x: event.clientX - initialX.current,
                y: event.clientY - initialY.current,
            };
            setPosition(newPosition);
            Move(newPosition.x, newPosition.y);
        }
    }, [moving, Move]);
    const removeEvents = useCallback(() => {
        setMoving(false);
    }, []);
    const onMouseDown = useCallback((event) => {
        if (dragRef.current) {
            const { left, top } = dragRef.current.getBoundingClientRect();
            initialX.current = event.clientX - left;
            initialY.current = event.clientY - top;
            setMoving(true);
        }
    }, [dragRef, setMoving]);
    const handleMouseLeave = useCallback(() => {
        removeEvents();
        setShowBtnChanger(false);
    }, [removeEvents]);
    return (_jsxs("div", { id: id, ref: dragRef, className: "draggable", style: {
            transform: `translate(${position.x}px, ${position.y}px)`,
            opacity: moving ? opacity : 1,
            zIndex: styleZIndex,
        }, onMouseMove: onMouseMove, onMouseDown: onMouseDown, onMouseUp: removeEvents, onMouseLeave: handleMouseLeave, onMouseEnter: () => setShowBtnChanger(true), children: [_jsx(BtnChanger, { show: showBtnChanger, dragRef: dragRef, setStyleZIndex: setStyleZIndex, saveDataProps: {
                    id: id,
                    x: position.x,
                    y: position.y,
                    zIndex: styleZIndex,
                }, saveData: saveData }), _jsx("div", { children: children })] }));
}
export default React.memo(Draggable);
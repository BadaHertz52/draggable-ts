import React, { ReactNode } from "react";
import "./style.scss";
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
    isBtnChanger?: boolean;
};
declare function Draggable({ id, children, x, y, saveData, opacity, zIndex, isBtnChanger, }: DraggableProps): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Draggable>;
export default _default;

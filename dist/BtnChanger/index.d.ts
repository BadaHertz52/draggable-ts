import React, { RefObject, SetStateAction, Dispatch } from "react";
import "./style.scss";
import { SaveDataProps } from "../Draggable";
type BtnChangerProps = {
    saveDataProps: SaveDataProps;
    dragRef: RefObject<HTMLDivElement>;
    setStyleZIndex: Dispatch<SetStateAction<number>>;
    show: boolean;
    saveData?: (props: SaveDataProps) => void;
};
declare function BtnChanger({ dragRef, setStyleZIndex, show, saveData, saveDataProps, }: BtnChangerProps): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof BtnChanger>;
export default _default;

import React, { RefObject, SetStateAction, Dispatch } from "react";
import "./style.scss";
import { SaveDataParams } from "../Draggable";
type BtnChangerProps = {
    saveDataParmas: SaveDataParams;
    dragRef: RefObject<HTMLDivElement>;
    setStyleZIndex: Dispatch<SetStateAction<number>>;
    show: boolean;
    saveData?: (props: SaveDataParams) => void;
};
declare function BtnChanger({ dragRef, setStyleZIndex, show, saveData, saveDataParmas, }: BtnChangerProps): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof BtnChanger>;
export default _default;

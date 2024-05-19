import { ReactNode } from "react";
import { TextStyle } from "react-native";

export interface DevTextProps {
    children: ReactNode;
    fontFamily?: string;
    textStyle?: TextStyle;
    color?: string;
    center?: boolean;
    bold?: boolean;
    onPress?: () => void;
}
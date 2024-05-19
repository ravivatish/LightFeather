export interface DevButtonProps {
    title?: string;
    onPress: () => void;
    loading?: boolean;
    secondary?: boolean;
    iconEnable?: boolean;
    loadingColor?: string;
    externalContainerStyle?: any;
    fontColor?: string;
    disabled?: boolean
}
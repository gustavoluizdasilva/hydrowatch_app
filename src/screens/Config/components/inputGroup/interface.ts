export interface InputGroupProps {
    titleGroup: string;
    min: string | undefined;
    max: string | undefined;
    onMinChange?: (minValue: string) => void;
    onMaxChange?: (maxValue: string) => void;
}

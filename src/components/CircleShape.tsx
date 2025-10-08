import { View } from "react-native";

interface Circle {
    width: number;
    height: number;
    fillColor?: string;
    className?: string;
    borderRadius: number;
    topValue?: number;
    leftValue?: number;
    rightValue?: number;
    bottomValue?: number;
}

export default function CircleShape({ width, height, fillColor, className, borderRadius, topValue, leftValue, rightValue, bottomValue }: Circle) {

    return (
        <View>
            <View className={`${className ?? ""}`} style={{
                width: width,
                height: height,
                borderRadius: borderRadius,
                position: "absolute",
                ...(fillColor !== undefined && { backgroundColor: fillColor }),
                ...(topValue !== undefined && { top: topValue }),
                ...(leftValue !== undefined && { left: leftValue }),
                ...(rightValue !== undefined && { right: rightValue }),
                ...(bottomValue !== undefined && { bottom: bottomValue }),
            }} />
        </View>
    )
}
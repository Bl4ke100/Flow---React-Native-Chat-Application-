import { Animated, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack} from "../../App";
import { Video } from "expo-av";
import { useTheme } from "../theme/ThemeProvider";

type Props = NativeStackNavigationProp<RootStack, 'Splash'>;

export default function SplashScreen() {

    const navigation = useNavigation<Props>();

    const fadeIn = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeIn]);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('SignUp'); 
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigation]);

    const { applied } = useTheme();

    const videoSource = applied === 'dark' ? require("../../assets/logo/Logo_Animation_White.mp4") : require("../../assets/logo/Logo_Animation.mp4");

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center items-center">
            <StatusBar hidden={true} />

            <Video
                source={videoSource}
                style={{
                    width: 500,
                    aspectRatio: 4 / 3,
                    bottom: 30,
                    alignSelf: 'center',
                    marginLeft: 20
                }}
                resizeMode={'contain' as any}
                shouldPlay
                isLooping
                useNativeControls={false}
                isMuted={true}
            />

            <View className="absolute bottom-10 items-center">
                <View className="mb-2 flex justify-center items-center ">
                    <Text className="text-gray-400 text-sm">
                        DEVELOPED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                        VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
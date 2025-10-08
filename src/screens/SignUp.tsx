import { Text, View } from "react-native";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
    return (
        <SafeAreaView className="flex-1 justify-center items-center dark:bg-black">
            <Text className="text-black dark:text-white">Sign Up</Text>
        </SafeAreaView>
    );
}
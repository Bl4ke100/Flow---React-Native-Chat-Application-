import { Image, KeyboardAvoidingView, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { useTheme } from "../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type SignUpProps = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;


export default function SignUpScreen() {

    const navigation = useNavigation<SignUpProps>();
    
    const { applied } = useTheme();
    const logo =
        applied === 'dark'
            ? require("../../assets/logo/Flow_Logo_White.png")
            : require("../../assets/logo/Flow_Logo_Black.png");

    return (
        <AlertNotificationRoot>
            <KeyboardAvoidingView behavior="padding" className="flex-1 justify-center items-center bg-white dark:bg-black">
                <SafeAreaView className="flex-1 justify-center items-center w-full px-8 bottom-7">
                    <StatusBar hidden={true} />
                    <View className="justify-center items-center mb-8">
                        <Image source={logo} className="w-32 h-32 ml-8 mb-8" />
                        <Text className="text-black dark:text-white text-xl font-bold">Create Your Account</Text>
                    </View>
                    <View className="w-full space-y-4">
                        <View className="mb-4">
                            <FloatingLabelInput
                                label="First Name"
                                maxLength={20}
                            />
                        </View>

                        <View className="mb-4">
                            <FloatingLabelInput
                                label="Last Name"
                                maxLength={20}
                            />
                        </View>

                        <Pressable className="w-full h-12 bg-black dark:bg-white rounded-xl justify-center items-center"
                        onPress={() => navigation.navigate('Contact')}
                        >
                            <Text className="text-white dark:text-black font-bold">Continue</Text>
                        </Pressable>
                        <Pressable className="w-full h-12 justify-center items-center ">
                            <Text className="text-black dark:text-white font-bold">Already have an account? Sign In</Text>
                        </Pressable>

                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </AlertNotificationRoot>
    );
}
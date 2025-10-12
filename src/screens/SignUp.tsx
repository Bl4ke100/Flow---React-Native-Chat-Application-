import { Image, KeyboardAvoidingView, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";
import { useTheme } from "../theme/ThemeProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack} from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";
import { useState } from "react";

type SignUpProps = NativeStackNavigationProp<RootStack, 'SignUp'>;


export default function SignUpScreen() {

    const navigation = useNavigation<SignUpProps>();

    const { applied } = useTheme();
    const logo =
        applied === 'dark'
            ? require("../../assets/logo/Flow_Logo_White.png")
            : require("../../assets/logo/Flow_Logo_Black.png");

    const { userData, setUserData } = useUserRegistration();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <AlertNotificationRoot theme={applied === 'dark' ? 'dark' : 'light'}>
            <KeyboardAvoidingView behavior="padding" className="flex-1 justify-center items-center bg-white dark:bg-black">
                <SafeAreaView className="flex-1 justify-center items-center w-full px-8 bottom-7">
                    <StatusBar hidden={true} />
                    <View className="justify-center items-center mb-5">
                        <Image source={logo} className="w-32 h-32 ml-8 mb-8" />
                        <Text className="text-black dark:text-white text-xl font-bold">Create Your Account</Text>
                    </View>
                    <View className="w-full space-y-4">
                        <View className="mb-4">
                            <TextInput inputMode="text" className="w-full text-lg h-14 border border-black dark:border-white rounded-xl px-4 placeholder:text-gray-400 text-black dark:text-white font-bold" placeholder="First Name"
                                value={userData.firstName}
                                onChangeText={(text) => {
                                    setFirstName(text);
                                    setUserData((previous) => ({
                                        ...previous,
                                        firstName: text
                                    }));
                                }} />

                        </View>

                        <View className="mb-5">
                            <TextInput inputMode="text" className="w-full text-lg h-14 border border-black dark:border-white rounded-xl px-4 placeholder:text-gray-400 text-black dark:text-white font-bold" placeholder="Last Name"
                                value={userData.lastName}
                                onChangeText={(text) => {
                                    setLastName(text);
                                    setUserData((previous) => ({
                                        ...previous,
                                        lastName: text
                                    }));
                                }}
                            />
                        </View>

                        <Pressable className="w-full h-12 bg-black dark:bg-white rounded-xl justify-center items-center"
                            onPress={() => {
                                let validFirstName = validateFirstName(firstName);
                                let validLastName = validateLastName(lastName);
                                if(validFirstName){
                                    Dialog.show({
                                        type: ALERT_TYPE.DANGER,
                                        title: 'Error',
                                        textBody: validFirstName,
                                        button: 'Close',
                                        
                                    });
                                }else if(validLastName){
                                    Dialog.show({
                                        type: ALERT_TYPE.DANGER,
                                        title: 'Error',
                                        textBody: validLastName,
                                        button: 'Close',
                                    });
                                }else{
                                    navigation.navigate('Contact');
                                }
                            }}
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
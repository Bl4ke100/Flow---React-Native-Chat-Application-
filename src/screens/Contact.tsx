import { Image, KeyboardAvoidingView, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { useTheme } from "../theme/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";
import { validateCountryCode, validatePhoneNumber } from "../util/Validation";

type ContactProps = NativeStackNavigationProp<RootStackParamList, "Contact">;

export default function ContactScreen() {

    const navigation = useNavigation<ContactProps>();

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState<CountryItem | null>(null);

    const { applied } = useTheme();
    const logo =
        applied === 'dark'
            ? require("../../assets/logo/Flow_Logo_White.png")
            : require("../../assets/logo/Flow_Logo_Black.png");

    const { userData, setUserData } = useUserRegistration();

    const currentCountryCode = countryCode?.dial_code || userData.countryCode;


    return (

        <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-black">
            <AlertNotificationRoot theme={applied === 'dark' ? 'dark' : 'light'}>
                <StatusBar hidden={true} />
                <KeyboardAvoidingView behavior="padding" className="flex-1 justify-center items-center">

                    <View className="justify-center items-center bottom-6">
                        <View>
                            <Image source={logo} className="w-32 h-32 ml-8 mb-8" />
                        </View>


                        <View>
                            <Text className="text-black dark:text-white text-md text-center mt-4 font-bold">Please enter your phone number</Text>
                        </View>

                        <View className="w-full px-8 mt-6 flex-row gap-2">
                            <Pressable className="w-4/12 h-12 bg-black dark:bg-white rounded-xl justify-center items-center border border-black dark:border-white"
                                onPress={() => { setShow(true) }}
                            >
                                <Text className="text-white dark:text-black font-bold">
                                    &nbsp;&nbsp; {countryCode?.dial_code ? countryCode.dial_code : userData.countryCode ? userData.countryCode : "Code"} &nbsp;
                                    <AntDesign name="caret-down" size={14} color={applied === 'dark' ? 'black' : 'white'} />
                                    &nbsp;
                                </Text>
                            </Pressable>
                            <TextInput inputMode="tel" className="w-8/12 h-12 border border-black dark:border-white rounded-xl px-4 placeholder:text-gray-400 text-black dark:text-white font-bold" placeholder="71 ### ####"
                                value={userData.phoneNumber}
                                onChangeText={(text) => {
                                    setUserData((previous) => ({
                                        ...previous,
                                        phoneNumber: text
                                    }));
                                }}
                            />
                        </View>

                        <View className="justify-center items-center px-8 mt-4">
                            <CountryPicker
                                show={show}
                                lang={"en"}
                                pickerButtonOnPress={(item) => {
                                    setCountryCode(item);
                                    setShow(false);
                                    setUserData((previous) => ({
                                        ...previous,
                                        countryCode: item.dial_code ? item.dial_code : "+94"
                                    }));
                                    console.log(userData.countryCode);
                                }}
                                onBackdropPress={() => setShow(false)}
                                style={{
                                    modal: {
                                        height: '80%',
                                        width: '95%',
                                        alignSelf: 'center',
                                        borderRadius: 10
                                    },

                                }}
                            />
                        </View>

                        <View className="w-full px-8 mt-4 flex-row gap-2">
                            <Pressable className="w-full h-12 bg-black dark:bg-white rounded-xl justify-center items-center border border-black dark:border-white"
                                onPress={() => {
                                    const validCountryCode = validateCountryCode(currentCountryCode);
                                    const validPhoneNumber = validatePhoneNumber(userData.phoneNumber);
                                    if (validCountryCode) {
                                        Dialog.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: 'Error',
                                            textBody: validCountryCode,
                                            button: 'Close',
                                        });
                                    } else if (validPhoneNumber) {
                                        Dialog.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: 'Error',
                                            textBody: validPhoneNumber,
                                            button: 'Close',
                                        });
                                    } else {
                                        navigation.navigate("Avatar");
                                    }
                                }}
                            >
                                <Text className="text-white dark:text-black font-bold">
                                    Continue
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </AlertNotificationRoot>
        </SafeAreaView>

    );
}
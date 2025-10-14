import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StatusBar, Text, TextInput, View, Pressable, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { use, useEffect, useLayoutEffect, useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { useUserRegistration } from "../components/UserContext";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";
import { validateCountryCode, validateFirstName, validateLastName, validatePhoneNumber } from "../util/Validation";
import { useSendNewContact } from "../socket/UseSendNewContact";

type NewContactScreenProps = NativeStackNavigationProp<RootStack, 'NewContact'>;

export default function NewContactScreen() {

    const navigation = useNavigation<NewContactScreenProps>();

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState<CountryItem | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const { applied } = useTheme();
    const logo =
        applied === 'dark'
            ? require("../../assets/logo/Flow_Logo_White.png")
            : require("../../assets/logo/Flow_Logo_Black.png");

    const { userData, setUserData } = useUserRegistration();

    const currentCountryCode = countryCode?.dial_code || "+94";

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: '',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: applied === 'dark' ? '#0D0D0D' : '#DBDBDB',
            },
            headerTitleStyle: {
                color: applied === 'dark' ? '#0D0D0D' : '#DBDBDB',
                fontSize: 25,
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <View className="flex-row items-center mt-3 pb-2 w-full">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color={applied === 'dark' ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <View className="ml-2 flex-row items-center">
                        <Text className="text-black dark:text-white text-2xl font-bold text-center">
                            New Contact
                        </Text>
                    </View>
                </View>
            ),

        });

    }, [navigation]);

    const newContact = useSendNewContact();
    const sendNewContact = newContact.sendNewContact;
    const responseText = newContact.responseText;

    const sendData = () => {
        sendNewContact({
            id: 0,
            firstName: firstName,
            lastName: lastName,
            countryCode: currentCountryCode,
            contactNo: phoneNumber,
            createdAt: "",
            updatedAt: "",
            status: ""
        })
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setCountryCode("+94" as any);
    }


    return (
        <SafeAreaView className="flex-1 items-center bg-white dark:bg-black">
            <AlertNotificationRoot theme={applied === 'dark' ? 'dark' : 'light'}>
                <StatusBar hidden={true} />
                <KeyboardAvoidingView behavior="padding" className="flex-1 items-center">
                    <View className="w-full justify-center items-center pb-10">

                        <View className="mb-6 items-center">
                            <Pressable
                                className="w-28 h-28 rounded-full border-2 border-black dark:border-white justify-center items-center"
                                onPress={() => console.log("Pick avatar")}
                            >
                                <Feather name="user" size={80} color={applied === 'dark' ? 'white' : 'black'} />
                            </Pressable>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                Tap to add avatar
                            </Text>
                        </View>

                        <View className="w-full px-8">

                            <TextInput
                                inputMode="text"
                                className="w-full h-12 border border-black dark:border-white rounded-xl px-4 mb-4 placeholder:text-gray-400 text-black dark:text-white font-bold"
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                            />

                            <TextInput
                                inputMode="text"
                                className="w-full h-12 border border-black dark:border-white rounded-xl px-4 mb-4 placeholder:text-gray-400 text-black dark:text-white font-bold"
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                            />

                            <View className="flex-row gap-2 mb-4">
                                <Pressable
                                    className="w-4/12 h-12 bg-black dark:bg-white rounded-xl justify-center items-center border border-black dark:border-white"
                                    onPress={() => setShow(true)}
                                >
                                    <Text className="text-white dark:text-black font-bold">
                                        {countryCode?.dial_code
                                            ? countryCode.dial_code
                                            : "+94"}
                                        <AntDesign
                                            name="caret-down"
                                            size={14}
                                            color={applied === "dark" ? "black" : "white"}
                                        />
                                    </Text>
                                </Pressable>

                                <TextInput
                                    inputMode="tel"
                                    className="w-8/12 h-12 border border-black dark:border-white rounded-xl px-4 placeholder:text-gray-400 text-black dark:text-white font-bold"
                                    placeholder="71 ### ####"
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(text)}
                                />
                            </View>

                            <CountryPicker
                                show={show}
                                lang={"en"}
                                pickerButtonOnPress={(item) => {
                                    setCountryCode(item);
                                    setShow(false);

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

                            <Pressable
                                className="w-full h-12 bg-black dark:bg-white rounded-xl justify-center items-center border border-black dark:border-white mt-4"
                                onPress={() => {
                                    console.log(firstName, lastName, currentCountryCode, phoneNumber);
                                    const validFirstName = validateFirstName(firstName);
                                    const validLastName = validateLastName(lastName);
                                    const validCountryCode = validateCountryCode(currentCountryCode);
                                    const validPhoneNumber = validatePhoneNumber(phoneNumber);
                                    if (firstName.length === 0) {
                                        Dialog.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: "Error",
                                            textBody: "First Name is Required!",
                                            button: "Close",
                                        });
                                    } else if (lastName.length === 0) {
                                        Dialog.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: "Error",
                                            textBody: "Last Name is Required!",
                                            button: "Close",
                                        });
                                    } else if (validCountryCode) {
                                        Dialog.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: "Error",
                                            textBody: validCountryCode,
                                            button: "Close",
                                        });
                                    } else if (validPhoneNumber) {
                                        Dialog.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: "Error",
                                            textBody: validPhoneNumber,
                                            button: "Close",
                                        });
                                    } else {
                                        sendData();
                                    }
                                }}
                            >
                                <Text className="text-white dark:text-black font-bold">
                                    Add Contact
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </AlertNotificationRoot>
        </SafeAreaView>
    );

}
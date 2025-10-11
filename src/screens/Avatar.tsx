import { ActivityIndicator, FlatList, Image, Pressable, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import "../../global.css";
import { useContext, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { useUserRegistration } from "../components/UserContext";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";
import { validateProfileImage } from "../util/Validation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { AuthContext } from "../components/AuthProvider";
import { createNewAccount } from "../api/UserService";

type AvatarProps = NativeStackNavigationProp<RootStackParamList, "Avatar">;

export default function AvatarScreen() {

    const navigation = useNavigation<AvatarProps>();

    const { applied } = useTheme();
    const logo =
        applied === 'dark'
            ? require("../../assets/logo/Flow_Logo_White.png")
            : require("../../assets/logo/Flow_Logo_Black.png");


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const [image, setImage] = useState<string | null>(null);

    const avatars = [
        require("../../assets/avatars/avatar_1.png"),
        require("../../assets/avatars/avatar_2.png"),
        require("../../assets/avatars/avatar_3.png"),
        require("../../assets/avatars/avatar_4.png"),
        require("../../assets/avatars/avatar_5.png"),
        require("../../assets/avatars/avatar_6.png"),
        require("../../assets/avatars/avatar_7.png"),
        require("../../assets/avatars/avatar_8.png"),
        require("../../assets/avatars/avatar_9.png"),
    ];

    const { userData, setUserData } = useUserRegistration();

    const handleAvatarSelection = (item: any) => {
        const uri = Image.resolveAssetSource(item).uri;
        setImage(uri);
        setUserData((previous) => ({
            ...previous,
            profileImage: uri
        }));
    };

    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);



    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <AlertNotificationRoot theme={applied === 'dark' ? 'dark' : 'light'}>

                <StatusBar hidden={true} />

                <View className="flex-1 w-full items-center pt-10 mt-11">

                    <View className="items-center px-8 top-10">
                        <Image source={logo} className="w-32 h-32 ml-8 mb-8" />
                        <Text className="text-black dark:text-white text-xl font-bold text-center">
                            Add a profile picture
                        </Text>
                        <Pressable
                            className="w-40 h-40 bg-gray-200 dark:bg-gray-800 rounded-full justify-center items-center my-5"
                            onPress={pickImage}
                        >
                            {image ? (
                                <Image source={{ uri: image }} className="w-40 h-40 rounded-full" />
                            ) : (
                                <View className="w-40 h-40 bg-gray-200 dark:bg-gray-800 rounded-full justify-center items-center">
                                    <Text className="text-gray-500 dark:text-gray-400 text-xl font-bold">+</Text>
                                    <Text className="text-gray-500 dark:text-gray-400 text-lg font-semibold">Upload</Text>
                                </View>
                            )}
                        </Pressable>
                        <Text className="text-black dark:text-white text-lg font-semibold text-center">
                            or
                        </Text>
                        <Text className="text-black dark:text-white text-lg font-semibold text-center">
                            Choose an Avatar
                        </Text>
                    </View>

                    <View className="flex-1 w-full my-5 bottom-11">
                        <FlatList
                            data={avatars}
                            horizontal
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleAvatarSelection(item)}>
                                    <Image source={item} className="w-20 h-20 rounded-full mx-2" />
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <View className="w-full px-8 mb-8">
                        <Pressable className="w-full h-12 bg-black dark:bg-white rounded-xl justify-center items-center"
                            onPress={async () => {
                                const validationObject = {
                                    uri: image ?? '',
                                    type: undefined,
                                    fileSize: undefined
                                };

                                const validProfileImage = validateProfileImage(validationObject);

                                if (validProfileImage) {
                                    Dialog.show({
                                        type: ALERT_TYPE.DANGER,
                                        title: 'Error',
                                        textBody: validProfileImage,
                                        button: 'Close',
                                    });
                                } else {
                                    setUserData((previous) => ({
                                        ...previous,
                                        profileImage: image
                                    }));
                                    try {
                                        setLoading(true);
                                        const response = await createNewAccount(userData);
                                        if (response.status) {
                                            Dialog.show({
                                                type: ALERT_TYPE.SUCCESS,
                                                title: 'Success',
                                                textBody: 'Account created successfully!',
                                                button: 'Continue',
                                                onPressButton() {
                                                    navigation.replace('Home');
                                                },
                                            });
                                        } else {
                                            Dialog.show({
                                                type: ALERT_TYPE.DANGER,
                                                title: 'Error',
                                                textBody: response.message,
                                                button: 'Close',
                                            });
                                        }
                                        console.log(response);
                                    } catch (error) {

                                    } finally {
                                        setLoading(false);
                                    }


                                }
                            }}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#B2BEB5" />
                            ) : (
                                <Text className="text-white dark:text-black font-bold">Create Account</Text>
                            )
                            }
                        </Pressable>
                    </View>

                </View>
            </AlertNotificationRoot>
        </SafeAreaView>
    );
}
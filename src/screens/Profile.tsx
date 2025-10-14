import { Image, Text, TouchableOpacity, View } from "react-native";
import "../../global.css";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { useLayoutEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useUserProfile } from "../socket/UseUserProfile";


type ProfileProps = NativeStackNavigationProp<RootStack, 'Profile'>;

export default function ProfileScreen() {

    const navigation = useNavigation<ProfileProps>();
    const { applied } = useTheme();
    const userProfileData = useUserProfile();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: '',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: applied === 'dark' ? '#0D0D0D' : 'white',
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
                            Profile
                        </Text>
                    </View>
                </View>
            ),

        });

    }, [navigation]);

    const [image, setImage] = useState<string | null>(null);

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

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <View className="flex-[1.5] justify-center items-center">
                <Image
                    source={image ? { uri: image } : require("../../assets/avatars/avatar_1.png")}
                    className="w-40 h-40 rounded-full border-[4px] border-black dark:border-white"
                />
                <TouchableOpacity
                    onPress={pickImage}
                    className="mt-6 px-8 py-3 bg-black dark:bg-white rounded-xl border border-black dark:border-white"
                >
                    <Text className="text-white dark:text-black font-bold text-base">
                        Edit Profile Image
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="flex-[1] w-full px-8 mt-6">
                <View className="mb-6">
                    <View className="flex-row items-center mb-2">
                        <Feather name="user" size={22} color={applied === 'dark' ? 'white' : 'black'} />
                        <Text className="ml-3 text-base font-semibold text-black dark:text-white">Name</Text>
                    </View>
                    <View className="ml-[34px] border-b border-gray-300 dark:border-gray-700 pb-2">
                        <Text className="text-gray-500 dark:text-gray-400 text-lg">
                            Blake
                        </Text>
                    </View>
                </View>

                <View>
                    <View className="flex-row items-center mb-2">
                        <Feather name="phone" size={22} color={applied === 'dark' ? 'white' : 'black'} />
                        <Text className="ml-3 text-base font-semibold text-black dark:text-white">Phone</Text>
                    </View>
                    <View className="ml-[34px] border-b border-gray-300 dark:border-gray-700 pb-2">
                        <Text className="text-gray-500 dark:text-gray-400 text-lg">
                            +1 234 567 890
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>


    );
}
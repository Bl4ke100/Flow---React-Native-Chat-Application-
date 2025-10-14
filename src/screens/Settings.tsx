import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeOption, useTheme } from "../theme/ThemeProvider";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const options: ThemeOption[] = ["light", "dark", "system"];


export default function SettingsScreen() {
    const navigation = useNavigation<any>();
    const { applied, preference, setPreference } = useTheme();

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
                            Settings
                        </Text>
                    </View>
                </View>
            ),

        });

    }, [navigation]);
    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <StatusBar hidden={true} />
            <View className="flex-1 px-6">
                <View className="mt-6 mb-4 ml-5">
                    <Text className={`text-lg font-bold ${applied === 'dark' ? 'text-white' : 'text-black'}`}>Theme</Text>
                    <Text className={`text-sm ${applied === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Select your preferred theme
                    </Text>
                </View>

                <View className="flex-row justify-between mt-2 items-center p-2">
                    {options.map((option) => {
                        const isSelected = preference === option;
                        return (
                            <TouchableOpacity
                                key={option}
                                onPress={() => setPreference(option)}
                                className={`flex-1 mx-1 py-3 rounded-2xl border border-black dark:border-white
                            ${isSelected
                                        ? applied === 'dark'
                                            ? 'bg-white border-white'
                                            : 'bg-black border-black'
                                        : 'bg-transparent border-gray-400 dark:border-gray-600'
                                    }`}
                            >
                                <Text
                                    className={`text-center font-semibold ${isSelected
                                            ? applied === 'dark'
                                                ? 'text-black'
                                                : 'text-white'
                                            : applied === 'dark'
                                                ? 'text-gray-300'
                                                : 'text-gray-800'
                                        }`}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>

    );
}
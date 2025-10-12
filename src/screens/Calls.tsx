// src/screens/CallsScreen.tsx

import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import "../../global.css";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack} from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

// Define navigation props
type CallsProps = NativeStackNavigationProp<RootStack, 'Calls'>; // Adjust route name if you add 'Calls' to your stack

// Mock data for the calls list
const calls = [
    {
        id: '1',
        name: 'John Doe',
        avatar: require('../../assets/avatars/avatar_1.png'),
        time: 'Today, 10:45 AM',
        type: 'incoming', // 'incoming', 'outgoing', 'missed'
        callMethod: 'video' // 'video', 'voice'
    },
    {
        id: '2',
        name: 'Jane Smith',
        avatar: require('../../assets/avatars/avatar_2.png'),
        time: 'Yesterday, 8:20 PM',
        type: 'missed',
        callMethod: 'voice'
    },
    {
        id: '3',
        name: 'Henry Johnson',
        avatar: require('../../assets/avatars/avatar_3.png'),
        time: 'October 10, 4:00 PM',
        type: 'outgoing',
        callMethod: 'voice'
    },
    {
        id: '4',
        name: 'Ben Davis',
        avatar: require('../../assets/avatars/avatar_6.png'),
        time: 'October 9, 11:30 AM',
        type: 'incoming',
        callMethod: 'video'
    },
    {
        id: '5',
        name: 'Ryan Williams',
        avatar: require('../../assets/avatars/avatar_5.png'),
        time: 'October 8, 2:15 PM',
        type: 'incoming',
        callMethod: 'video'
    },
    {
        id: '6',
        name: 'Rick Brown',
        avatar: require('../../assets/avatars/avatar_6.png'),
        time: 'October 9, 11:30 AM',
        type: 'incoming',
        callMethod: 'video'
    },
    {
        id: '7',
        name: 'Ryan Williams',
        avatar: require('../../assets/avatars/avatar_5.png'),
        time: 'October 8, 2:15 PM',
        type: 'incoming',
        callMethod: 'video'
    },
    {
        id: '8',
        name: 'Rick Brown',
        avatar: require('../../assets/avatars/avatar_6.png'),
        time: 'October 9, 11:30 AM',
        type: 'incoming',
        callMethod: 'video'
    },
    {
        id: '9',
        name: 'Ryan Williams',
        avatar: require('../../assets/avatars/avatar_5.png'),
        time: 'October 8, 2:15 PM',
        type: 'incoming',
        callMethod: 'video'
    },
    {
        id: '10',
        name: 'Rick Brown',
        avatar: require('../../assets/avatars/avatar_6.png'),
        time: 'October 9, 11:30 AM',
        type: 'incoming',
        callMethod: 'video'
    }
];

export default function CallsScreen() {
    const navigation = useNavigation<CallsProps>();
    const { applied } = useTheme();
    const logo = applied === 'dark'
        ? require("../../assets/logo/Flow_Logo_White.png")
        : require("../../assets/logo/Flow_Logo_Black.png");

    // Set header options dynamically
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Calls',
            headerTitleAlign: 'left',
            headerStyle: { backgroundColor: applied === 'dark' ? '#000000' : '#FFFFFF' },
            headerTitleStyle: {
                color: applied === 'dark' ? '#FFFFFF' : '#000000',
                fontSize: 25,
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <View className="flex-row items-center">
                    <Image source={logo} className="w-8 h-8 ml-5" />
                </View>
            ),
             headerRight: () => (
                <View className="flex-row items-center gap-4 mr-4">
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color={applied === 'dark' ? '#FFFFFF' : '#000000'} style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, applied, logo]);

    const renderCallItem = ({ item }: { item: typeof calls[0] }) => {
        const isMissed = item.type === 'missed';
        const callTypeIcon = item.type === 'incoming' ? 'arrow-down-outline' : 'arrow-up-outline';
        const callTypeColor = isMissed ? '#ef4444' : '#8e8e93'; // Red for missed, gray for others

        return (
            <TouchableOpacity className="flex-row items-center w-full px-4 py-3 active:bg-gray-100 dark:active:bg-gray-900">
                <Image source={item.avatar} className="w-14 h-14 rounded-full" />
                
                <View className="flex-1 ml-4">
                    <Text className={`text-base font-semibold ${isMissed ? 'text-red-500' : 'text-black dark:text-white'}`} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name={callTypeIcon} size={16} color={callTypeColor} />
                        <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1" numberOfLines={1}>
                            {item.time}
                        </Text>
                    </View>
                </View>
                
                <TouchableOpacity className="p-2">
                    <Ionicons 
                        name={item.callMethod === 'video' ? 'videocam' : 'call'} 
                        size={26} 
                        color={applied === 'dark' ? '#FFFFFF' : '#000000'} 
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <StatusBar hidden={true} />
            <FlatList
                data={calls}
                renderItem={renderCallItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => (
                    <Text className="px-4 pt-4 pb-2 text-base font-semibold text-black dark:text-white">
                        Recent
                    </Text>
                )}
            />
             <TouchableOpacity className="absolute bottom-5 right-5 w-16 h-16 bg-black dark:bg-white rounded-full justify-center items-center shadow-lg">
                <Ionicons name="call-sharp" size={28} color={applied === 'dark' ? 'black' : 'white'} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
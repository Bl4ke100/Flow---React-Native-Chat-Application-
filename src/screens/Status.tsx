
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View, ScrollView } from "react-native";
import "../../global.css";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack} from "../../App"; 
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect } from "react";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type StatusProps = NativeStackNavigationProp<RootStack, 'Status'>; 

const statuses = [
    {
        id: '1',
        name: 'John Doe',
        time: '15 minutes ago',
        avatar: require('../../assets/avatars/avatar_1.png'),
        viewed: false,
    },
    {
        id: '2',
        name: 'Jane Smith',
        time: 'Today, 2:10 PM',
        avatar: require('../../assets/avatars/avatar_2.png'),
        viewed: false,
    },
    {
        id: '3',
        name: 'Ben Davis',
        time: 'Today, 11:30 AM',
        avatar: require('../../assets/avatars/avatar_6.png'),
        viewed: true,
    },
    {
        id: '4',
        name: 'Henry Johnson',
        time: 'Today, 9:00 AM',
        avatar: require('../../assets/avatars/avatar_3.png'),
        viewed: true,
    }
];

export default function StatusScreen() {
    const navigation = useNavigation<StatusProps>();
    const { applied } = useTheme();
    const logo = applied === 'dark'
        ? require("../../assets/logo/Flow_Logo_White.png")
        : require("../../assets/logo/Flow_Logo_Black.png");

    const recentUpdates = statuses.filter(status => !status.viewed);
    const viewedUpdates = statuses.filter(status => status.viewed);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Status',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: applied === 'dark' ? '#000000' : '#FFFFFF',
            },
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

    const renderStatusItem = ({ item }: { item: typeof statuses[0] }) => (
        <TouchableOpacity className="flex-row items-center w-full px-4 py-3">
            <View className={`p-1 rounded-full ${item.viewed ? 'border-gray-500' : 'border-green-500'} border-2`}>
                <Image source={item.avatar} className="w-14 h-14 rounded-full" />
            </View>
            <View className="flex-1 ml-4">
                <Text className="text-base font-semibold text-black dark:text-white" numberOfLines={1}>
                    {item.name}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400" numberOfLines={1}>
                    {item.time}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }: { title: string }) => (
        <Text className="px-4 pt-4 pb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            {title}
        </Text>
    );

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <StatusBar hidden={true} />
            <ScrollView className="flex-1">
                <View className="px-4 pt-4 pb-2">
                    <TouchableOpacity className="flex-row items-center w-full">
                        <View className="relative">
                            <Image source={require('../../assets/avatars/avatar_1.png')} // Replace with actual user avatar
                                className="w-14 h-14 rounded-full" />
                            <View className="absolute bottom-0 right-0 bg-green-500 rounded-full w-6 h-6 justify-center items-center border-2 border-white dark:border-black">
                                <Ionicons name="add" size={18} color="white" />
                            </View>
                        </View>
                        <View className="flex-1 ml-4">
                            <Text className="text-base font-semibold text-black dark:text-white">My status</Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-400">Tap to add status update</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {recentUpdates.length > 0 && (
                    <>
                        <SectionHeader title="RECENT UPDATES" />
                        <FlatList
                            data={recentUpdates}
                            renderItem={renderStatusItem}
                            keyExtractor={item => item.id}
                            scrollEnabled={false} 
                        />
                    </>
                )}

                {viewedUpdates.length > 0 && (
                    <>
                        <SectionHeader title="VIEWED UPDATES" />
                        <FlatList
                            data={viewedUpdates}
                            renderItem={renderStatusItem}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                        />
                    </>
                )}
            </ScrollView>

            <View className="absolute bottom-5 right-5 items-center gap-y-4">
                 <TouchableOpacity className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl justify-center items-center shadow-lg">
                    <MaterialCommunityIcons name="pencil" size={24} color={applied === 'dark' ? '#FFFFFF' : '#000000'} />
                </TouchableOpacity>
                <TouchableOpacity className="w-16 h-16 bg-black dark:bg-white rounded-full justify-center items-center shadow-lg">
                    <Entypo name="camera" size={28} color={applied === 'dark' ? 'black' : 'white'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
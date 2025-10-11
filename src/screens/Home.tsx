// --- IMPORTS ---
// We'll use a mix of imports from both files
import { FlatList, Image, Modal, Pressable, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import "../../global.css"; // From the design file
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App"; // Assuming 'RootStackParamList' is correct
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider"; // From the design file for styling
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useLayoutEffect, useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons"; // From the design file for icons

// --- FUNCTIONAL HOOKS AND UTILS (from your working code) ---
import { useChatList } from "../socket/UseChatList";
import { formatChatTime } from "../util/DateFormatter";
import { Chat } from "../socket/chat";
import { AuthContext } from "../components/AuthProvider";

// Define the navigation properties
type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenProps>();
    
    // --- STATE AND LOGIC (100% from your working code) ---
    const [search, setSearch] = useState(""); // <-- Using 'search' from your working code
    const chatList = useChatList();
    const [isModalVisible, setModalVisible] = useState(false);
    const auth = useContext(AuthContext);

    // --- HOOKS FOR STYLING (from your design code) ---
    const { applied } = useTheme();
    const logo =
        applied === 'dark'
            ? require("../../assets/logo/Flow_Logo_White.png")
            : require("../../assets/logo/Flow_Logo_Black.png");

    // --- HEADER (Using the design's style, but the working code's logic) ---
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Flow',
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
                    <Image source={logo} className="w-8 h-8 mr-2" />
                </View>
            ),
            headerRight: () => (
                <View className="flex-row items-center gap-4 mr-4">
                    <TouchableOpacity>
                        <Entypo name="camera" size={24} color={applied === 'dark' ? '#FFFFFF' : '#000000'} />
                    </TouchableOpacity>
                    {/* The functionality comes from your working code */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons name="ellipsis-vertical" size={24} color={applied === 'dark' ? '#FFFFFF' : '#000000'} style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, applied, isModalVisible]); // Added isModalVisible dependency

    // --- DATA FILTERING (100% from your working code) ---
    const filterdChats = [...chatList]
        .filter((chat) => {
            return (
                chat.friendName.toLowerCase().includes(search.toLowerCase()) || // <-- Using 'search' state
                chat.lastMessage.toLowerCase().includes(search.toLowerCase())
            );
        })
        .sort(
            (a, b) =>
                new Date(b.lastTimeStamp).getTime() -
                new Date(a.lastTimeStamp).getTime()
        );

    // --- RENDER ITEM (Using the design's style, but the working data) ---
    const renderItem = ({ item }: { item: Chat }) => (
        <TouchableOpacity
            className="flex-row items-center justify-between w-full px-4 py-4 border-b border-gray-200 dark:border-gray-800 active:bg-gray-100 dark:active:bg-gray-900"
            // Navigation logic from your working code
            onPress={() => {
                navigation.navigate("SingleChat", {
                    chatId: item.friendId,
                    friendName: item.friendName,
                    lastSeenTime: formatChatTime(item.lastTimeStamp),
                    profileImage: item.profileImage
                        ? item.profileImage
                        : `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random`,
                });
            }}
        >
            <View className="flex-row items-center flex-1">
                <Image
                    source={{
                        uri: item.profileImage
                            ? item.profileImage
                            : `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random`
                    }}
                    className="w-14 h-14 rounded-full mr-3"
                />
                <View className="flex-1 mr-2">
                    <Text className="text-base font-semibold text-black dark:text-white mb-1" numberOfLines={1} ellipsizeMode="tail">
                        {item.friendName}
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400" numberOfLines={1} ellipsizeMode="tail">
                        {item.lastMessage}
                    </Text>
                </View>
            </View>
            <View className="items-end">
                <Text className="text-xs text-gray-500 mb-1">{formatChatTime(item.lastTimeStamp)}</Text>
                {item.unreadCount > 0 && (
                    <View className="bg-black dark:bg-white rounded-full w-6 h-6 justify-center items-center">
                        <Text className="text-white dark:text-black text-xs font-bold">{item.unreadCount}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["right", "bottom", "left"]}>
            <StatusBar hidden={true} />

            {/* --- SEARCH BAR (Using design's style, but working state) --- */}
            <View className="flex-row items-center border-gray-300 dark:border-gray-700 rounded-xl border w-11/12 h-12 px-4 my-3 self-center">
                <Ionicons name="search" size={24} color={applied === 'dark' ? '#FFFFFF' : '#000000'} />
                <TextInput
                    className="flex-1 mx-1 p-2 border-0 text-black dark:text-white text-lg font-bold"
                    placeholder="Search"
                    placeholderTextColor={applied === 'dark' ? '#A0A0A0' : '#808080'}
                    value={search} // <-- Hooked up to your 'search' state
                    onChangeText={(text) => setSearch(text)} // <-- Hooked up to your 'setSearch' function
                />
            </View>

            {/* --- CHAT LIST (Using design's container style) --- */}
            <View className="flex-1">
                <FlatList
                    data={filterdChats} // <-- Data from your working code
                    renderItem={renderItem}
                    keyExtractor={(item) => item.friendId.toString()}
                    className="w-full"
                />
            </View>

            {/* --- FLOATING ACTION BUTTON (Using design's style, but working navigation) --- */}
            <TouchableOpacity
                className="absolute bottom-5 right-5 w-16 h-16 bg-black dark:bg-white rounded-full justify-center items-center shadow-lg"
                onPress={() => navigation.navigate("NewChat")} // <-- Navigation from your working code
            >
                <Ionicons name="chatbox-ellipses" size={30} color={applied === 'dark' ? 'black' : 'white'} />
            </TouchableOpacity>

            {/* --- MODAL (100% from your working code, with minor style tweaks for theme) --- */}
            <Modal
                animationType="fade"
                visible={isModalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    className="flex-1 bg-black/30"
                    onPress={() => setModalVisible(false)}
                >
                    <View className="absolute top-16 right-5 bg-white dark:bg-neutral-800 rounded-md w-60 p-2 shadow-lg">
                        <TouchableOpacity
                            className="h-12 justify-center items-start px-3 rounded-md active:bg-gray-100 dark:active:bg-neutral-700"
                            onPress={() => {
                                navigation.navigate("Settings");
                                setModalVisible(false);
                            }}
                        >
                            <Text className="font-semibold text-base text-black dark:text-white">Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="h-12 justify-center items-start px-3 rounded-md active:bg-gray-100 dark:active:bg-neutral-700"
                            onPress={() => {
                                navigation.navigate("Profile");
                                setModalVisible(false);
                            }}
                        >
                            <Text className="font-semibold text-base text-black dark:text-white">My Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="h-12 justify-center items-start px-3 rounded-md active:bg-gray-100 dark:active:bg-neutral-700"
                            onPress={() => {
                                if (auth) auth.signOut();
                                setModalVisible(false);
                            }}
                        >
                            <Text className="font-semibold text-base text-black dark:text-white">Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}
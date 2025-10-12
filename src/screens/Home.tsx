import { FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import "../../global.css";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack} from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { SetStateAction, useLayoutEffect, useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useChatList } from "../socket/UseChatList";
import { formatChatTime } from "../util/DateFormatter";

type HomeProps = NativeStackNavigationProp<RootStack, 'Home'>;

const chats = [
    {
        id: '1',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '2:30 PM',
        avatar: require('../../assets/avatars/avatar_1.png'),
        unread: 2
    },
    {
        id: '2',
        name: 'Jane Smith',
        lastMessage: 'Are we still on for tomorrow?',
        time: '3:00 PM',
        avatar: require('../../assets/avatars/avatar_2.png'),
        unread: 1
    },
    {
        id: '3',
        name: 'Henry Johnson',
        lastMessage: 'What about the meeting?',
        time: '4:00 PM',
        avatar: require('../../assets/avatars/avatar_3.png'),
        unread: 2
    },
    {
        id: '4',
        name: 'Ryan Williams',
        lastMessage: 'Let\'s catch up later.',
        time: '5:00 PM',
        avatar: require('../../assets/avatars/avatar_4.png'),
        unread: 2
    },
    {
        id: '5',
        name: 'Rick Brown',
        lastMessage: 'See you soon!',
        time: '6:00 PM',
        avatar: require('../../assets/avatars/avatar_5.png'),
        unread: 2
    },
    {
        id: '6',
        name: 'Ben Davis',
        lastMessage: 'Got it, thanks!',
        time: '7:00 PM',
        avatar: require('../../assets/avatars/avatar_6.png'),
        unread: 7
    },
    {
        id: '7',
        name: 'Chris Miller',
        lastMessage: 'Talk to you later.',
        time: '8:00 PM',
        avatar: require('../../assets/avatars/avatar_7.png'),
        unread: 0
    },
    {
        id: '8',
        name: 'David Wilson',
        lastMessage: 'See you tomorrow!',
        time: '9:00 PM',
        avatar: require('../../assets/avatars/avatar_8.png'),
        unread: 1
    }
]

export default function HomeScreen() {

    const navigation = useNavigation<HomeProps>();

    const [searchText, setSearchText] = useState("");

    const chatList = useChatList();

    const { applied } = useTheme();
    const logo =
        applied === 'dark'
            ? require("../../assets/logo/Flow_Logo_White.png")
            : require("../../assets/logo/Flow_Logo_Black.png");

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
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color={applied === 'dark' ? '#FFFFFF' : '#000000'} style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]); 

    const filteredChats = chatList.filter((chat) => {
        console.log(chat);

        return(
            chat.friendName.toLowerCase().includes(searchText.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchText.toLowerCase())
        )
    });

    const renderItem = ({ item }: any) => (
        <TouchableOpacity 
            className="flex-row items-center justify-between w-full px-4 py-4 border-b border-gray-200 dark:border-gray-800 active:bg-gray-100 dark:active:bg-gray-900"
            onPress={()=>{
                navigation.navigate("SingleChat",{
                    chatId: item.friendId,
                    friendName: item.friendName,
                    lastSeenTime: formatChatTime(item.lastTimeStamp),
                    profileImage: item.profileImage,
                })
            }}
        >
            <View className="flex-row items-center flex-1">
            <Image source={{uri: item.profileImage}} className="w-14 h-14 rounded-full mr-3" />
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
        <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-black">
            <StatusBar hidden={true} />
            <View className="flex-row items-center border-gray-300 rounded-xl border w-11/12 h-12 px-4 bottom-4">
                <Ionicons name="search" size={24} color={applied === 'dark' ? '#FFFFFF' : '#000000'}/>
                <TextInput className="flex-1 mx-1 p-2 border-0 text-black dark:text-white text-lg font-bold" placeholder="Search" 
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            <View className="flex-1 justify-center items-center">
                <FlatList data={filteredChats} renderItem={renderItem} />
            </View>
            <View className="absolute bottom-5 right-5 w-16 h-16 bg-black dark:bg-white rounded-full justify-center items-center">
                <Ionicons name="chatbox-ellipses" size={30} color={applied === 'dark' ? 'black' : 'white'} />
            </View>
        </SafeAreaView>
    );
}
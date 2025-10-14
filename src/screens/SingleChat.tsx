import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useLayoutEffect, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";

type Message = {
  id: number;
  text: string;
  sender: "me" | "friend";
  title: string;
  time: string;
  status: "sent" | "delivered" | "read";
};



type singleChatScreenProps = NativeStackScreenProps<RootStack, 'SingleChat'>;

export default function SingleChatScreen({ route, navigation }: singleChatScreenProps) {

  const { chatId, friendName, lastSeenTime, profileImage } = route.params;

  const singleChat = useSingleChat(chatId);
  const messages = singleChat.messages;
  const friend = singleChat.friend;

  const sendMessage = useSendChat();

  // console.log("Chat ID:", chatId);
  // console.log("Friend Name:", friendName);
  // console.log("Last Seen Time:", lastSeenTime);
  // console.log("Profile Image:", profileImage);

  // const [message, setMessage] = useState<Message[]>([
  //   { id: 1, text: "Hello!", sender: "me", title: "New Message", time: "10:00 AM", status: "sent" },
  //   { id: 2, text: "Hi there!", sender: "friend", title: "Reply", time: "10:01 AM", status: "sent" },
  //   { id: 3, text: "How are you?", sender: "me", title: "New Message", time: "10:02 AM", status: "delivered" },
  //   { id: 4, text: "I'm good, thanks!", sender: "friend", title: "Reply", time: "10:03 AM", status: "delivered" },
  //   { id: 5, text: "What about you?", sender: "friend", title: "Reply", time: "10:04 AM", status: "read" },
  //   { id: 6, text: "Doing well!", sender: "me", title: "New Message", time: "10:05 AM", status: "read" },
  //   { id: 7, text: "Great to hear!", sender: "friend", title: "Reply", time: "10:06 AM", status: "read" },
  //   { id: 8, text: "How is Anne doing?", sender: "me", title: "New Message", time: "10:07 AM", status: "read" },
  //   { id: 9, text: "She's fine, thanks for asking!", sender: "friend", title: "Reply", time: "10:08 AM", status: "read" },
  //   { id: 10, text: "Are you sure?", sender: "me", title: "New Message", time: "10:09 AM", status: "sent" },
  //   { id: 11, text: "Yes", sender: "friend", title: "Reply", time: "10:10 AM", status: "delivered" },
  //   { id: 12, text: "How are you so sure?", sender: "me", title: "New Message", time: "10:11 AM", status: "read" },
  //   { id: 13, text: "Because I spoke to her yesterday.", sender: "friend", title: "Reply", time: "10:12 AM", status: "read" },
  //   { id: 14, text: "Oh, that's good to know.", sender: "me", title: "New Message", time: "10:13 AM", status: "read" },
  //   { id: 15, text: "Yes, indeed! So, Now shut your butch as up you nigga", sender: "friend", title: "Reply", time: "10:14 AM", status: "read" },
  //   { id: 16, text: "Let's catch up sometime.", sender: "me", title: "New Message", time: "10:15 AM", status: "sent" },
  //   { id: 17, text: "Sure, looking forward to it!", sender: "friend", title: "Reply", time: "10:16 AM", status: "delivered" },
  //   { id: 18, text: "Great!", sender: "me", title: "New Message", time: "10:17 AM", status: "read" },
  //   { id: 19, text: "See you soon.", sender: "friend", title: "Reply", time: "10:18 AM", status: "read" },
  //   { id: 20, text: "Bye!", sender: "me", title: "New Message", time: "10:19 AM", status: "read" },


  // ]);

  const [input, setInput] = useState<string>("");

  const { applied } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerLeft: () => (
        <View className="justify-center items-center flex-row mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={applied === 'dark' ? 'white' : 'black'} />
          </TouchableOpacity>
          {profileImage ? (
          <Image source={{ uri: profileImage }} className="w-14 h-14 rounded-full ml-2" />
          ) : (
          <View className="w-14 h-14 rounded-full ml-2 bg-gray-200 dark:bg-gray-800 justify-center items-center">
            <Text className="text-3xl text-gray-500 dark:text-gray-400 text-center font-bold">
              {friend?.firstName.charAt(0).toUpperCase()}{friend?.lastName.charAt(0).toUpperCase()}
            </Text>
          </View>
          )}
          <View className="ml-2">
            <Text className={`text-lg font-bold ${applied === 'dark' ? 'text-white' : 'text-black'}`}>{friend?.firstName} {friend?.lastName}</Text>
            <Text className={`text-sm ${applied === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{friend?.status === "ONLINE" ? "Online" : `Last seen at ${formatChatTime(friend?.updatedAt.toString() ?? "")}`}</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color={applied === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: applied === 'dark' ? '#0D0D0D' : '#DBDBDB',
      },
    });
  }, [navigation, friend]);

  const renderItem = ({ item }: { item: Chat }) => {
    const isMe = item.from.id !== chatId;
    return (
      <View className={`my-1 px-3 max-w[60%] ${isMe ? 'self-end bg-black dark:bg-white p-1 rounded-tl-xl rounded-bl-xl rounded-br-xl' : 'self-start bg-gray-300 p-1 rounded-tr-xl rounded-br-xl rounded-bl-xl'
        }`}
      >
        <Text className={` ${isMe ? 'text-white dark:text-black' : 'text-black'} text-lg`}>{item.message}</Text>
        <View className="flex-row justify-end">
          <Text className={`${isMe ? 'text-white dark:text-black' : 'text-black'} text-xs`}>
            {formatChatTime(item.createdAt)}
          </Text>
          {isMe && (
            <Ionicons
              name={item.status === "SENT" ? "checkmark-sharp" : item.status === "DELIVERED" ? "checkmark-done-sharp" : "checkmark-done-sharp"}
              size={12}
              color={item.status === "READ" ? "green" : isMe ? "black" : "white"}
              className="ml-1"
            />
          )}
        </View>
      </View>
    );
  };

  const handleSendChat = () => {
    if (!input.trim()) {
      return;
    }
    sendMessage(chatId, input);
    setInput("");
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={['right', 'bottom', 'left']}>
      <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} keyboardVerticalOffset={100} className="flex-1">
        <FlatList
          data={messages}
          renderItem={renderItem}
          className="px-3"
          keyExtractor={(_, index) => index.toString()}
          inverted
        />
        <View className={`flex-row items-center p-2 border-t ${applied === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
          <TextInput className={`flex-1 h-14 text-lg max-h-20 px-4 rounded-full ${applied === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} placeholder:text-gray-500`}
            placeholder="Type a message..."
            value={input}
            onChangeText={(item) => setInput(item)}
          />
          <TouchableOpacity className="ml-2 bg-black dark:bg-white p-3 rounded-full h-12 w-12 justify-center items-center"
            onPress={handleSendChat}
            disabled={input.trim() === ""}>
            <Ionicons name="send" size={20} color={applied === 'dark' ? 'black' : 'white'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
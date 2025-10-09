import { KeyboardAvoidingView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactScreen() {
 return (

    <SafeAreaView>
        <KeyboardAvoidingView>
            <Text>Contact Screen</Text>
        </KeyboardAvoidingView>
    </SafeAreaView>

 );   
}
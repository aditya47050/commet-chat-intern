import React from "react";
import { View, StyleSheet } from "react-native";
import {
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatMessageComposer,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";


const Messages = ({
  user,
  group,
  onBack,
}: {
  user?: CometChat.User;
  group?: CometChat.Group;
  onBack: () => void;
}) => {
  return (
    <View /* root container fills the entire screen */ style={styles.root}>
      {/* Top bar: avatar, name & back button */}
      <CometChatMessageHeader
        user={user}
        group={group}
        onBack={onBack}
        showBackButton
      />

      {/* Scrollable list of chat messages */}
      <CometChatMessageList user={user} group={group} />

      {/* Input field + action buttons (emoji, attach, send, etc.) */}
      <CometChatMessageComposer user={user} group={group} />
    </View>
  );
};

const styles = StyleSheet.create({
  /** Ensures the component stretches to use all available space */
  root: {
    flex: 1,
  },
});

export default Messages;
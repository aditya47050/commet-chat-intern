import React, { useEffect, useState } from "react";
import { SafeAreaView, ViewStyle } from "react-native";
import {
  CometChatConversations,
  CometChatUIKit,
  CometChatUiKitConstants,
  UIKitSettings,
  CometChatThemeProvider,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";

import Messages from "./Messages";

/* -------------------------------------------------------------------------- */
/*  ⚙️  Replace the placeholders below with your own CometChat credentials.    */
/* -------------------------------------------------------------------------- */
const APP_ID = "2783412eee6631ce"; // e.g. "123456abc"
const AUTH_KEY = "0ced51ddb77b6a05d10a38d32ead5a0ec3f4c71a"; // e.g. "0b1c2d3e4f5g6h7i8j9k"
const REGION = "in"; // e.g. "us" | "eu" | "in"
const DEMO_UID = "cometchat-uid-1"; // e.g. "john_doe"
/* -------------------------------------------------------------------------- */

/**
 * App
 * ---
 * The root component:
 *  1. Initializes the CometChat UI Kit.
 *  2. Logs a demo user in.
 *  3. Shows either the conversation list or an active chat screen.
 */
const App = (): React.ReactElement => {
  /* ------------------------------------------------------------------ */
  /* Local state                                                         */
  /* ------------------------------------------------------------------ */
  const [loggedIn, setLoggedIn] = useState(false);
  const [messageUser, setMessageUser] = useState<CometChat.User>();
  const [messageGroup, setMessageGroup] = useState<CometChat.Group>();

  /* ------------------------------------------------------------------ */
  /* One-time initialization                                             */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const init = async () => {
      // 1️⃣  Configure the UI Kit.
      const uiKitSettings: UIKitSettings = {
        appId: APP_ID,
        authKey: AUTH_KEY,
        region: REGION,
        subscriptionType: CometChat.AppSettings
          .SUBSCRIPTION_TYPE_ALL_USERS as UIKitSettings["subscriptionType"],
      };

      try {
        await CometChatUIKit.init(uiKitSettings);
        console.log("[CometChatUIKit] initialized");

        // 2️⃣  Login.
        await CometChatUIKit.login({ uid: DEMO_UID });
        setLoggedIn(true);
      } catch (err) {
        console.error("[CometChatUIKit] init/login error", err);
      }
    };

    init();
  }, []);

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */
  return (
    <SafeAreaView style={styles.fullScreen}>
      <CometChatThemeProvider>
        {/* Show conversations only after the user is logged in */}
        {loggedIn && (
          <>
            {/* Conversation list (hidden when a chat is open) */}
            <CometChatConversations
              style={{
                containerStyle: {
                  display: messageUser || messageGroup ? "none" : "flex",
                },
              }}
              onItemPress={(conversation: CometChat.Conversation) => {
                if (
                  conversation.getConversationType() ===
                  CometChatUiKitConstants.ConversationTypeConstants.user
                ) {
                  setMessageUser(
                    conversation.getConversationWith() as CometChat.User
                  );
                  return;
                }
                setMessageGroup(
                  conversation.getConversationWith() as CometChat.Group
                );
              }}
            />

            {/* Active chat screen */}
            {(messageUser || messageGroup) && (
              <Messages
                user={messageUser}
                group={messageGroup}
                onBack={() => {
                  setMessageUser(undefined);
                  setMessageGroup(undefined);
                }}
              />
            )}
          </>
        )}
      </CometChatThemeProvider>
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */
const styles: { fullScreen: ViewStyle } = {
  fullScreen: { flex: 1 },
};

export default App;
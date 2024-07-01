import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerItemList } from "@react-navigation/drawer";
import CustomIcons from "@/components/CustomIcons";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <SafeAreaView>
            <CustomDrawer />
            <DrawerItemList {...props} />
          </SafeAreaView>
        )}
        screenOptions={{
          drawerActiveTintColor: "white",
          drawerActiveBackgroundColor: "#1A91DB",
          drawerInactiveTintColor: "#1c1c1c",
          drawerPosition: "left",
          drawerType: "front",
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="chatlist"
          options={{
            drawerLabel: "Chat List",
            drawerIcon: ({ color }) => (
              <CustomIcons
                name="chatbubble-ellipses-outline"
                color={color}
                size={28}
              />
            ),
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            drawerIcon: ({ color }) => (
              <CustomIcons name="person-outline" color={color} size={28} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ color }) => (
              <CustomIcons name="settings-outline" color={color} size={28} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

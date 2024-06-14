import AuthApi from "@/api/AuthApi";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const MyProfile = () => {
  const { setUser } = useAuth();
  const [username, setUsername] = React.useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AuthApi.getUser();
      setUsername(user);
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await AuthApi.logout();
    setUser(undefined);
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{username}</Text>
      <Button mode="contained" onPress={logout} buttonColor="#A38F85">
        Log out
      </Button>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e0df",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 16,
  },
});

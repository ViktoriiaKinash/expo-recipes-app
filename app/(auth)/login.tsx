import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import axios from "axios";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";

import AuthApi from "@/api/AuthApi";
import { useAuth } from "@/hooks/useAuth";

const defaultValues = {
  username: "",
  password: "",
};

const SettingsScreen: React.FC = () => {
  const { setUser } = useAuth();
  const { control, handleSubmit, setError } = useForm({
    defaultValues,
  });
  const [loading, setLoading] = useState(false);
  const [username, setUsename] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSecureTextEntry, setIsSecureTextEntry] = React.useState(true);

  const onValidData = async (): Promise<void> => {
    const values = {
      username: username,
      password: password,
    };
    setLoading(true);
    try {
      await AuthApi.login(values);
      const user = await AuthApi.getUser();
      setUser(user);
      router.replace("/home");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          setError("username", {
            type: "custom",
            message: e.response.data.username,
          });
          setError("password", {
            type: "custom",
            message: e.response.data.detail || e.response.data.password,
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={false}
        label="Username"
        onChangeText={(text) => setUsename(text)}
        style={styles.input}
        textColor="#A38F85"
      />
      <TextInput
        label="Password"
        style={styles.input}
        secureTextEntry={isSecureTextEntry}
        right={
          <TextInput.Icon
            icon={isSecureTextEntry ? "eye" : "eye-off"}
            onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
          />
        }
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        mode="contained"
        onPress={onValidData}
        loading={loading}
        buttonColor="#A38F85"
      >
        Login
      </Button>
      <Button onPress={() => router.replace("/register")} textColor="#A38F85">
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    gap: 24,
    backgroundColor: "#e4e0df",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  input: {
    backgroundColor: "#e4e0df",
    color: "#A38F85",
  },
});

export default SettingsScreen;

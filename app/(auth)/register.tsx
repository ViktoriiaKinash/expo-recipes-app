import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import axios from "axios";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import AuthApi from "@/api/AuthApi";
import { useAuth } from "@/hooks/useAuth";
import { Button, TextInput } from "react-native-paper";

const defaultValues = {
  username: "",
  password: "",
  email: "",
};

const SettingsScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsename] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const { setUser } = useAuth();
  const { control, handleSubmit, setError } = useForm({
    defaultValues,
  });

  const onValidData = async (): Promise<void> => {
    const values = {
      username: username,
      password: password,
      email: email,
    };
    setLoading(true);
    try {
      await AuthApi.register(values);
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
      setSuccess(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={false}
        label="Username"
        onChangeText={(text) => setUsename(text)}
      />
      <TextInput label="Password" onChangeText={(text) => setPassword(text)} />
      <Button
        buttonColor="#A38F85"
        mode="contained"
        onPress={onValidData}
        loading={loading}
      >
        Register
      </Button>
      {success && (
        <>
          <Text>Registered successfully!</Text>
        </>
      )}
      <Button textColor="#A38F85" onPress={() => router.replace("/login")}>
        Login
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

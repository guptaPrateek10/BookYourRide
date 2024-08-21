import { Animated, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onSignUpPress = async () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full h-[250px] z-0 " />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5 ">
            Create your account
          </Text>
        </View>
        <View className="p-5 ">
          <InputField
            label={"name"}
            placeholder={"Enter your name"}
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />{" "}
          <InputField
            label={"email"}
            placeholder={"Enter your email"}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label={"password"}
            placeholder={"Enter your password"}
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title={"Sign Up"}
            onPress={onSignUpPress}
            className="mt-6"
          />
          {/*<OAuth />*/}
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

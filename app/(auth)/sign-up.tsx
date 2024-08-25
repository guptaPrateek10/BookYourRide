import { Animated, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        //Todo create a DB user
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
        // router.replace("/");
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].message,
      });
    }
  };

  // need to resolve text error
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
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account?</Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
        <ReactNativeModal isVisible={verification.state === "default"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;

import { Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { View } from "react-native";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";
const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastIndex = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#286FF] rounded-full" />
        }
        onIndexChanged={(index: number) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => {
          return (
            <View
              className="flex items-center justify-center p-5"
              key={item.id}
            >
              <Image
                source={item.image}
                className="w-full h-[300px]"
                resizeMode="contain"
              />
              <View className="flex  flex-row items-center justify-center mt-10 w-full">
                <Text className="text-3xl font-bold text-black mx-10 text-center">
                  {item.title}
                </Text>
              </View>
              <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mt-3  mx-10">
                {item.description}{" "}
              </Text>
            </View>
          );
        })}
      </Swiper>
      <CustomButton
        title={isLastIndex ? "Get started" : "Next"}
        onPress={() =>
          isLastIndex
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12  mt-10"
      />
    </SafeAreaView>
  );
};

export default Onboarding;

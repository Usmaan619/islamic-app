import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GradientHOC } from "../HOC/Gradient.hoc";
import Header from "../components/CommonHeader.component";
import { ICONS, NEWS_DATA } from "../constants/Contant";
import moment from "moment";
import { BlurView } from "expo-blur";
import ModalComponent from "../components/Modal.component";
import * as Location from "expo-location";
const DashboardPage = ({ navigation }) => {
  const screenWidth = useWindowDimensions().width;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const cardWidth = screenWidth * 0.44; // 40% of the screen width
  const cardHeight = cardWidth * 1.36; // maintaining the aspect ratio based on original dimensions

  const handleSearch = () => {
    console.log("te");
  };

  const SOCIAL_DATA = [
    {
      name: "Indian indices",
      icon: ICONS?.NFTS1Img,
    },

    {
      name: "US Stocks",
      icon: ICONS?.NFTS1Img,
    },

    {
      name: "Crypto",
      icon: ICONS?.NFTS1Img,
    },

    {
      name: "International Market",
      icon: ICONS?.NFTS1Img,
    },

    {
      name: "Currency",
      icon: ICONS?.NFTS1Img,
    },

    {
      name: "Commodity",
      icon: ICONS?.NFTS1Img,
    },
  ];

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <Header onSearch={handleSearch} />

      {/* <Text className="text-white">{text}</Text> */}

      <View style={{ flex: 1 }}>
        {/* news */}
        <View className="px-3 py-4">
          <View className="flex-row justify-between items-center mt-3 mb-10">
            <View>
              <Text className="font-bold text-lg  text-white">Prayers</Text>
              <Text className="font-medium text-sm text-gray-400">
                Stays informed with the latest
              </Text>
            </View>
            {/* <Image
              source={GIF.newsGif}
              className="h-20 w-24 "
              resizeMode="cover"
            /> */}
          </View>

          <View className="flex-row mt-3 mb-6">
            <ScrollView horizontal={true}>
              {NEWS_DATA?.map((d, idx) => (
                <View
                  key={idx}
                  className="border border-yellow-400 p-2 rounded-3xl text-center flex-row mx-1 overflow-hidden"
                >
                  <Text className="text-white">{d?.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View className="flex gap-3 items-center mb-14">
            {NEWS_DATA?.map((d, idx) => (
              <BlurView
                className="h-32 w-full  rounded-lg"
                key={idx}
                blurAmount={0.5}
                style={{ overflow: "hidden" }}
              >
                <TouchableOpacity onPress={toggleModal}>
                  <View className="flex-row justify-between">
                    <Text
                      className="truncate w-60 pt-4 text-base font-semibold text-white"
                      style={{ paddingStart: 14 }}
                    >
                      {d?.title}
                    </Text>
                    <View className="p-2">
                      <Image
                        className="h-20 w-20"
                        source={ICONS?.coinBaseImg}
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                  <Text
                    className="text-gray-300 font-semibold text-xs"
                    style={{ paddingStart: 12 }}
                  >
                    {moment().format("LLL")}
                  </Text>
                </TouchableOpacity>
              </BlurView>
            ))}
          </View>
        </View>
        {/* news end */}
      </View>
      <ModalComponent visible={isModalVisible} onClose={toggleModal} />
    </ScrollView>
  );
};

const style = {
  marqueeMainContainer: {
    fontSize: 24,
    color: "#fff",
    height: 60,
    backgroundColor: "#08130D",

    textAlign: "center",
    lineHeight: 60,
  },

  card: {
    borderRadius: 8,
    marginHorizontal: 8,
    overflow: "hidden",
    elevation: 12,
    // backgroundColor: "#006548",
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  text: {
    color: "#fff",
    fontSize: 12,
  },
};

export default GradientHOC(DashboardPage);

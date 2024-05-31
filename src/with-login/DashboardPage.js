import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GradientHOC } from "../HOC/Gradient.hoc";
import Header from "../components/CommonHeader.component";
import { ICONS, NEWS_DATA } from "../constants/Contant";
import moment from "moment";
import { BlurView } from "expo-blur";
import ModalComponent from "../components/Modal.component";
import * as Location from "expo-location";
import { loginAPI } from "../services/Auth.service";
// import MapView from "react-native-maps";

import MapView, { Marker } from "react-native-maps";

import { Dropdown } from "react-native-element-dropdown";

import { Feather } from "@expo/vector-icons";

import { EvilIcons } from "@expo/vector-icons";

const DashboardPage = ({ navigation }) => {
  const screenWidth = useWindowDimensions().width;
  const [value, setValue] = useState(null);
  const data = [
    { label: "Indore", value: "1" },
    { label: "Others", value: "2" },
  ];

  const [isFocus, setIsFocus] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // useEffect(() => {
  //   new Promise(async (resolve, reject) => {
  //     const res = await loginAPI();
  //     console.log("res: ", res);
  //   });
  // }, []);

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
      console.log("currentLocation: ", currentLocation);
      setLocation(currentLocation);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log("text: ", text);

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <Header onSearch={handleSearch} />

      {/* <Text className="text-white">{text}</Text> */}

      <View style={{ flex: 1 }}>
        {/* news */}
        <View className="px-3 pt-4">
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

          <View className="flex gap-3 items-center mb-8">
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
        {/* search */}
        <View className=" flex justify-center items-center pb-7 w-full ">
          <Dropdown
            style={[style.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            inputSearchStyle={style.inputSearchStyle}
            iconStyle={style.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select Area..." : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <EvilIcons
                name="location"
                size={20}
                color="#fff"
                style={style.icon}
              />
            )}
          />
        </View>
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
  map: {
    width: "100%",
    height: "100%",
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

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "white",
    borderRadius: 9,
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 15,
    width: "80%",
    height: 40,
    color: "#fff",
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: "#fff",
  },

  dropdown: {
    height: 50,
    width: "80%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#fff",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#fff",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
};

export default GradientHOC(DashboardPage);

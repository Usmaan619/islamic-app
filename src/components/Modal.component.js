import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import * as Animatable from "react-native-animatable";

const ModalComponent = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose} // Optional: for Android back button press
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text className="text-md font-semibold mb-4">TIMES</Text>

          <View className="w-full">
            <View className="flex-row justify-between w-full">
              <View className="h-7 w-auto ">
                <View className="flex  items-center my-auto">
                  <Text className="font-bold text-black text-sm">Fajr</Text>
                  <Text className="font-bold text-black text-sm">05:00 PM</Text>
                </View>
              </View>

              <View className="h-7 w-auto  ">
                <View className="flex  items-center my-auto">
                  <Text className="font-bold text-black text-sm">Duhur</Text>
                  <Text className="font-bold text-black text-sm">02:00 AM</Text>
                </View>
              </View>
              <View className="h-7 w-auto  ">
                <View className="flex  items-center my-auto">
                  <Text className="font-bold text-black text-sm">ASR</Text>
                  <Text className="font-bold text-black text-sm">02:00 AM</Text>
                </View>
              </View>
            </View>
            <View className="flex-row justify-evenly w-full mt-10">
              <View className="h-7 w-auto  ">
                <View className="flex  items-center my-auto">
                  <Text className="font-bold text-black text-sm">Maghrib</Text>
                  <Text className="font-bold text-black text-sm">02:00 AM</Text>
                </View>
              </View>
              <View className="h-7 w-auto  ">
                <View className="flex  items-center my-auto">
                  <Text className="font-bold text-black text-sm">Isha</Text>
                  <Text className="font-bold text-black text-sm">02:00 AM</Text>
                </View>
              </View>
            </View>
            <View className="flex-row  w-full justify-between  items-center mt-10">
              <Text className="font-bold text-black text-sm text-start">
                Imam name
              </Text>
              <Text className="font-bold text-black text-sm text-end">
                Test name
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: "auto",
    height: 280,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    // textAlign: "center",
  },
});

export default ModalComponent;

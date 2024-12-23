import React from "react";
import { Modal, Portal, Text, Button } from "react-native-paper";

export const Warning = ({ visible, onDismiss }) => {
  return (
    <Portal>
      <Modal visible={visible} animationType="fade" onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.title}>Warning</Text>
        <Text style={styles.message}>
          By choosing to view gas stations in other provinces, the routing functionality is not available. This option is only available for stations near your location.
        </Text>
        <Button onPress={onDismiss} mode="contained" style={styles.button}>
          OK
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = {
  modalContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 40,
    borderRadius: 10,
    elevation: 5,
    maxWidth: 350,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f', 
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#d9534f', 
    marginTop: 10,
    alignSelf: 'center',
  },
};

import { View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';


const scan = () => {

  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <View style={{ flex: 1}}>
      {!isPermissionGranted ? (
        <View style={styles.requestContainer}>
          <Pressable style={styles.requestButton} onPress={requestPermission}>
            <Text style={styles.requestText}>
              Enable Camera Permissions
            </Text>
          </Pressable>
        </View>
      ) : (
        <CameraView style={{ flex: 1 }}>
          
        </CameraView>
      )}
    </View>
  )
}

export default scan

const styles = StyleSheet.create({
  requestContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  requestButton: {
    backgroundColor: 'rgb(102,178,255)',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  requestText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
})
import * as ImagePicker from "expo-image-picker"

export const pickImageFn = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        return ({
            name: result.assets[0].fileName,
            uri: result.assets[0].uri
        })
      }

      return null
}
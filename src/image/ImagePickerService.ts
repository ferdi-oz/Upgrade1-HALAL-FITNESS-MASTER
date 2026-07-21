import * as ImagePicker from "expo-image-picker";

export class ImagePickerService {

  static async pickFromGallery() {

    const result = await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ["images"],

      quality: 1,

      allowsEditing: true,

    });

    if (result.canceled) {

      return null;

    }

    return result.assets[0];

  }

  static async takePhoto() {

    const result = await ImagePicker.launchCameraAsync({

      quality: 1,

      allowsEditing: true,

    });

    if (result.canceled) {

      return null;

    }

    return result.assets[0];

  }

}
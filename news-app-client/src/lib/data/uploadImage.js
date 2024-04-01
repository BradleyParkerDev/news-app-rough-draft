import { firebaseStorage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadImage = async (imageFile) => { // Accept imageFile as parameter
    try {
        const imageRef = ref(firebaseStorage, `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);

        const imageUrl = await getDownloadURL(imageRef);
        console.log(imageUrl)
        return imageUrl;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
};

export default uploadImage;

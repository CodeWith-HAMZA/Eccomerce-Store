import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./firebase";

export const addSingleDocument = async (givenDoc, givenCollection) => {
  let addedDocument = null;
  try {
    const docRef = await addDoc(collection(db, givenCollection), {
      ...givenDoc,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);

    return docRef.id;
  } catch (error) {
    console.log("Error While Adding User To Collection", error);
  }
 
};

export const getSingleDocumentById = async (givenCollection, givenDocId) => {
  
  const docRef = doc(db, givenCollection, givenDocId);
  const document = await getDoc(docRef);

  if (document.exists()) {
    console.log("Document data:", document.data());
  } else {
    console.log("No such document!");
  }

  return document.data();
};
export const getMultipleDocs = async (givenCollection) => {
  let allDocs = [];
  const q = query(collection(db, givenCollection));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data(), doc.get("country"), doc);
    allDocs.push({ id: doc.id, ...doc.data() });
  });
  return allDocs;
};

export const findByIdAndUpdateDoc = async (
  givenCollection,
  givenDocId,
  DocumentFieldsObj
) => {
  try {
    const docRef = doc(db, givenCollection, givenDocId);
    await updateDoc(docRef, {
      ...DocumentFieldsObj,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.log("Error while updating the field", err);
  }
};

export const findByFieldAndUpdateDoc = async (
  givenCollection,
  givenDocField,
  DocumentFieldsObj
) => {
  const docs = await getMultipleDocs(givenCollection);
  console.log(docs);
  for (const doc of docs) {
    if (givenDocField.email && givenDocField.email === doc.email) {
      await findByIdAndUpdateDoc(givenCollection, doc.id, DocumentFieldsObj);
    } else if (givenDocField.uid && givenDocField.uid === doc.uid) {
      await findByIdAndUpdateDoc(givenCollection, doc.id, DocumentFieldsObj);
    }
  }
};

// Product Schema Structure

// {
//   "id": "12345",
//   "name": "Men's T-Shirt",
//   "description": "A comfortable and stylish t-shirt for men",
//   "category": "Clothing",
//   "price": 20.99,
//   "quantity": 100,
//   "image": "https://example.com/images/tshirt.jpg",
//   "seller": {
//     "name": "ABC Clothing Store",
//     "location": "Karachi, Pakistan",
//     "contact": {
//       "phone": "123-456-7890",
//       "email": "abcstore@example.com"
//     }
//   },
//   "created_at": "2022-05-01T12:00:00Z",
//   "updated_at": "2022-05-15T10:30:00Z"
// }

// {
//   "id": "string", // unique identifier for the order
//   "customer": {
//     "name": "string", // name of the customer who placed the order
//     "email": "string", // email address of the customer who placed the order
//     "phone": "string" // phone number of the customer who placed the order
//   },
//   "items": [
//     {
//       "product_id": "string", // unique identifier for the product item in the order
//       "name": "string", // name of the product item
//       "quantity": number, // quantity of the product item in the order
//       "price": number // price of the product item in the order
//     }
//   ],
//   "total_price": number, // total price of the order
//   "shipping_address": "string", // shipping address of the customer
//   "payment_method": "string", // payment method used by the customer
//   "created_at": "string", // date and time when the order was created
//   "status": {
//     "type": "string",
//     "enum": ["Pending Processing", "Shipped", "Delivered", "Cancelled"]
//   } // status of the order
// }

export const uploadFileToCloud = async (file, imageFolder, imageName) => {
  let imageURL = "";

  const storageRef = ref(storage, `${imageFolder}/${imageName}.jpg`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error, "COULDNT UPLOAD");
    },
    async () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...

      const DownloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log(DownloadURL);

      imageURL = await DownloadURL;
    }
  );
  return imageURL;
};

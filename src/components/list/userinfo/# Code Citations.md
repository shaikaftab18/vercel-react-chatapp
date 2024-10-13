# Code Citations

## License: unknown
https://github.com/mahmoudtarek18/my-blog-redux-toolkit/tree/fd5b552dd0f3a9b693f4187557190cecf80dbac1/src/firebase/configs.ts

```
"firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain:
```


## License: unknown
https://github.com/DBcps/Serene-Space-Review-2/tree/a0e444503c4973dfda9df62701e80f700548146f/home.html

```
: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app =
```


## License: unknown
https://github.com/Senpaix69/Notes/tree/87bb7c8ce4960d9d2a0ee10214a3a197169fe0db/src/utils.js

```
uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`
```


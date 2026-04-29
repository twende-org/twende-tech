import { db } from "./src/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

async function checkUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
}

checkUsers();

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const gameCollection = 'BoardGames';


export async function listGames() {
    const doc_refs = await getDocs(collection(db, gameCollection))

    const results = [];
    console.log("doc_refs: ", doc_refs)

    doc_refs.forEach(game => {
        results.push({
            id: game.id,
           ...game.data()
        })
    })

    return results;
}

export async function addField(id, field, value) {
    const doc_ref = doc(db, gameCollection, id);
    await updateDoc(doc_ref, { [field]: value });
}

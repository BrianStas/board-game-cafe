import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const gameCollection = 'BoardGames';
const MenuCollection = 'MenuCollection';


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

export async function getGame(id){
    const doc_ref = doc(db, gameCollection, id);
    const docSnap = await getDoc(doc_ref);
    return docSnap.data();
}

export async function addField(id, field, value) {
    const doc_ref = doc(db, gameCollection, id);
    await updateDoc(doc_ref, { [field]: value });
}

export async function listFood() {
    const doc_refs = await getDocs(collection(db, MenuCollection))

    const results = [];
    console.log("doc_refs: ", doc_refs)

    doc_refs.forEach(item => {
        results.push({
            id: item.id,
           ...item.data()
        })
    })

    return results;
}

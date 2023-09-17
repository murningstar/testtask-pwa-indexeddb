import Dexie, { Table } from "dexie";

export class MySubClassedDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    imageFile!: Table<File>;

    constructor() {
        super("userImages");
        this.version(1).stores({
            imageFile: "++id, webkitRelativePath, name, lastModified",
        });
    }
}

export const db = new MySubClassedDexie();

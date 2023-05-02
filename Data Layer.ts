// file book.ts
class Book {
    constructor(public author: string) { }
}
interface EntityMap { book: Book };

// file book.ts
class Movie {
    constructor(public director: string) { }
}
interface EntityMap { movie: Movie };

// file book.ts
class Song {
    constructor(public artist: string) { }
}
interface EntityMap { song: Song };

// file store.ts
interface EntityMap {}

class Store {
    get<K extends keyof EntityMap>(kind: K, id: string): EntityMap[K] { }
    getAll<K extends keyof EntityMap>(kind: K): EntityMap[K][] { }
    create<K extends keyof EntityMap>(kind: K, toCreate: EntityMap[K]): void { }
    update<K extends keyof EntityMap>(kind: K, id: string, toUpdate: Partial<EntityMap[K]>) { }
}


// file app.ts
const store = new Store()
const myBook = new Book('Some Author');
store.get('book', '123');
store.getAll('book');
store.create('book', myBook);
store.update('book', '123', { author: 'Book Title' });
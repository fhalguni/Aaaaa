class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public price: number
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
  }
}
export { Book };

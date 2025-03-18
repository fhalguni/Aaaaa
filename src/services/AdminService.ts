import { Book } from "../models/bookModel";
import { AdminRepository } from "../repositories/adminRepo";
const adminRepo = new AdminRepository();
class AdminService {
  async addBook(title: string, author: string, price: number) {
    return await adminRepo.addBook(title, author, price);
  }

  async updateBook(book: Book) {
    return await adminRepo.updateBook(book);
  }

  async deleteBook(id: number) {
    return await adminRepo.deleteBook(id);
  }
}

export { AdminService };

import { studentRepo } from "../repositories/studentRepo";
const stuRepo = new studentRepo();
class StudentService {
  async searchBook(title: string) {
    return await stuRepo.searchBook(title);
  }
  async viewBook() {
    return await stuRepo.viewBook();
  }

  async borrowBook(studentId: number, bookId: number) {
    return await stuRepo.borrowBook(studentId, bookId);
  }
  async returnBook(studentId: number, bookId: number) {
    return await stuRepo.returnBook(studentId, bookId);
  }
}
export default new StudentService();

import { studentRepo } from "../repositories/studentRepo";
const stuRepo = new studentRepo();
class StudentService {
  async searchBook(title: string) {
    await stuRepo.searchBook(title);
  }
  async viewBook(id: number) {
    await stuRepo.viewBook(id);
  }

  async borrowBook(studentId: number, bookId: number) {
    await stuRepo.borrowBook(studentId, bookId);
  }
  async returnBook(studentId: number, bookId: number) {
    await stuRepo.returnBook(studentId, bookId);
  }
}
export default new StudentService();

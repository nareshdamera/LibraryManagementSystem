package com.rgukt.edu.library.controller;

import com.rgukt.edu.library.models.Books;
import com.rgukt.edu.library.service.BooksService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.rgukt.edu.library.dto.BorrowRequest;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BooksController {
    BooksService booksService;
    public BooksController(BooksService booksService){
        this.booksService=booksService;
    }

    @PostMapping("/addbook")
    public ResponseEntity<String> registerBook(
            @RequestParam("bookCode") String bookCode,
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("description") String description,
            @RequestParam("quantity") Integer availableQuantity,
            @RequestParam("image")MultipartFile image){
        try{
            booksService.registerBook(bookCode,title,author,category,description,availableQuantity,image);
            return ResponseEntity.ok("Book Added successfully");

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error:"+e.getMessage());
        }
    }

    @GetMapping("/books")
    public List<Books> getBooks(){
        return booksService.getAllBooks();
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Optional<Books>> getBookById(@PathVariable String id) {
        Optional<Books> book = booksService.getBookById(id);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    @PutMapping("/books/{bookCode}")
    public ResponseEntity<?> updateBook(
            @PathVariable String bookCode,
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("description") String description,
            @RequestParam("quantity") Integer availableQuantity,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            booksService.updateBook(bookCode, title, author, category, description, availableQuantity, image);
            // return updated book as response
            return ResponseEntity.ok(booksService.getBookById(bookCode).orElseThrow());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/borrow/{bookCode}")
    public ResponseEntity<String> borrowBook(@PathVariable String bookCode, @RequestBody BorrowRequest borrowRequest) throws IOException {
        String studentId = borrowRequest.getStudentId();

        // Business logic: Locate book, check availability, register borrow, etc.
        Optional<Books> bookOpt = booksService.getBookById(bookCode);
        if (bookOpt.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");

        Books book = bookOpt.get();
        if (book.getAvailableQuantity() <= 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Book is not available");

        // Example: Update book quantity and return success
        book.setAvailableQuantity(book.getAvailableQuantity() - 1);
        booksService.updateBook(book.getBookCode(), book.getTitle(), book.getAuthor(), book.getCategory(),
                book.getDescription(), book.getAvailableQuantity(), null);

        // You can also log the borrow record and associate with studentId
        return ResponseEntity.ok("Borrow request successful for student: " + studentId);
    }




    @GetMapping("/removebooks")
    public void removeBooks(){
        booksService.removeBooks();
    }



}

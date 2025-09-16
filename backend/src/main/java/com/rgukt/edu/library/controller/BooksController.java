package com.rgukt.edu.library.controller;

import com.rgukt.edu.library.models.Books;
import com.rgukt.edu.library.service.BooksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BooksController {
    BooksService booksService;
    public BooksController(BooksService booksService){
        this.booksService=booksService;
    }

    @PostMapping("/addbook")
    public ResponseEntity<String> registerBook(
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("availableQuantity") Integer availableQuantity,
            @RequestParam("image")MultipartFile image){
        try{
            booksService.registerBook(title,author,availableQuantity,image);
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
    public ResponseEntity<Books> getBookById(@PathVariable Long id) {
        Books book = booksService.getBookById(id);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    @GetMapping("/removebooks")
    public void removeBooks(){
        booksService.removeBooks();
    }

}

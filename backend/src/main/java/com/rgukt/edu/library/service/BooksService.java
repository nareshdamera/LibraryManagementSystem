package com.rgukt.edu.library.service;


import com.rgukt.edu.library.models.Books;
import com.rgukt.edu.library.repository.BooksRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BooksService {
    static BooksRepo booksRepo;
    BooksService(BooksRepo booksRepo){
        BooksService.booksRepo =booksRepo;
    }

//    public Books getBookById(Long id) {
//        return booksRepo.findById(id).orElse(null);
//    }


    public List<Books> getAllBooks() {
        return booksRepo.findAll();
    }

//    public void registerBook(String title, String author, Integer availableQuantity, MultipartFile image, String description,String bookCode) throws IOException {
//        Books newBook=new Books();
//        newBook.setBookCode(bookCode);
//        newBook.setTitle(title);
//        newBook.setAuthor(author);
//        newBook.setAvailableQuantity(availableQuantity);
//        newBook.setDescription(description);
//        if(image!=null && !image.isEmpty()){
//            newBook.setImage(image.getBytes());
//        }
//
//        booksRepo.save(newBook);
//
//    }


    public void removeBooks() {
        booksRepo.deleteAll();
    }

    public void registerBook(String bookCode, String title, String author, String category, String description, Integer availableQuantity, MultipartFile image) throws IOException {
        Books newBook=new Books();
        newBook.setBookCode(bookCode);
        newBook.setTitle(title);
        newBook.setAuthor(author);
        newBook.setCategory(category);
        newBook.setDescription(description);
        newBook.setAvailableQuantity(availableQuantity);
        if(image!=null && !image.isEmpty()){
            newBook.setImage(image.getBytes());
        }
        booksRepo.save(newBook);
    }


    public Optional<Books> getBookById(String id) {
        return booksRepo.findById(id);
    }
}

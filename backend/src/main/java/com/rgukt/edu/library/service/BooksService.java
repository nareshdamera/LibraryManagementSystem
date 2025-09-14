package com.rgukt.edu.library.service;


import com.rgukt.edu.library.models.Books;
import com.rgukt.edu.library.repository.BooksRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BooksService {
    BooksRepo booksRepo;
    BooksService(BooksRepo booksRepo){
        this.booksRepo=booksRepo;
    }


    public List<Books> getAllBooks() {
        return booksRepo.findAll();
    }

    public void registerBook(String title, String author, Integer availableQuantity, MultipartFile image) throws IOException {
        Books newBook=new Books();
        newBook.setTitle(title);
        newBook.setAuthor(author);
        newBook.setAvailableQuantity(availableQuantity);
        if(image!=null && !image.isEmpty()){
            newBook.setImage(image.getBytes());
        }

        booksRepo.save(newBook);

    }


    public void removeBooks() {
        booksRepo.deleteAll();
    }
}

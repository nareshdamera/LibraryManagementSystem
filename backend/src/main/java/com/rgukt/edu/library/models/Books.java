package com.rgukt.edu.library.models;

import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Entity
@Table(name="books")
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private Integer availableQuantity;

    @Lob
    @Column(name = "image")
    private byte[]image;
    public Books(){}

    public Long getId() {
        return bookId;
    }

    public void setId(Long id) {
        this.bookId = id;
    }

    public Books(String title, String author, Integer availableQuantity, MultipartFile image) throws IOException {
        this.title=title;
        this.author=author;
        this.availableQuantity=availableQuantity;
        this.image= image.getBytes();
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {

        this.availableQuantity = availableQuantity;
    }
    public byte[] getImage(){
        return image;
    }
    public void setImage(byte[] image){
        this.image=image;
    }



}

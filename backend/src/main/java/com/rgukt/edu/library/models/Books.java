package com.rgukt.edu.library.models;

import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Entity
@Table(name="books")
public class Books {

    @Id
    @Column(unique = true)
    private String bookCode;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer availableQuantity;

    @Lob
    @Basic(fetch = FetchType.LAZY) // Lazy load LOB to avoid PostgreSQL auto-commit error
    @Column(name = "image")
    private byte[] image;

    public Books() {}

    public Books(String bookCode, String title, String author, String category,
                 String description, Integer availableQuantity, MultipartFile image) throws IOException {
        this.bookCode = bookCode.toUpperCase();
        this.title = title;
        this.author = author;
        this.category = category;
        this.description = description;
        this.availableQuantity = availableQuantity;
        this.image = image.getBytes();
    }

    // Getters & Setters
    public String getBookCode() { return bookCode; }
    public void setBookCode(String bookCode) { this.bookCode = bookCode.toUpperCase(); }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(Integer availableQuantity) { this.availableQuantity = availableQuantity; }

    public byte[] getImage() { return image; }
    public void setImage(byte[] image) { this.image = image; }
}

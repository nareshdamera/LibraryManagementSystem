package com.rgukt.edu.library.models;

import jakarta.persistence.*;

@Entity
@Table(name = "requests")
public class Requests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy fetch to avoid unnecessary data loading
    @JoinColumn(name = "studentId", nullable = false)
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy fetch to avoid fetching LOB
    @JoinColumn(name = "bookCode", nullable = false)
    private Books book;

    @Column(nullable = false)
    private String bookTitle;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    public Requests() {}

    public Requests(Users user, Books book) {
        this.user = user;
        this.book = book;
        this.bookTitle = book.getTitle();
        this.status = Status.PENDING;
    }

    // Getters & Setters
    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

    public Books getBook() { return book; }
    public void setBook(Books book) {
        this.book = book;
        this.bookTitle = book.getTitle();
    }

    public String getBookTitle() { return bookTitle; }
    public void setBookTitle(String bookTitle) { this.bookTitle = bookTitle; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public enum Status {
        PENDING,
        APPROVED,
        RETURNED
    }
}

package com.rgukt.edu.library.models;
import jakarta.persistence.*;

@Entity
@Table(name = "requests")
public class Requests{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment PK
    private Long requestId;

    // Many requests can belong to one user
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false) // FK -> User
    private Users user;

    // Many requests can belong to one book
    @ManyToOne
    @JoinColumn(name = "bookId", nullable = false) // FK -> Book
    private Books book;

    @Enumerated(EnumType.STRING) // Save enum as string (PENDING/APPROVED/RETURNED)
    @Column(nullable = false)
    private Status status;

    // Default constructor
    public Requests() {}

    // Constructor
    public Requests(Users user, Books book, Status status) {
        this.user = user;
        this.book = book;
        this.status = status;
    }

    // Getters and Setters
    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Books getBook() {
        return book;
    }

    public void setBook(Books book) {
        this.book = book;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    // Enum for request status
    public enum Status {
        PENDING,
        APPROVED,
        RETURNED
    }
}


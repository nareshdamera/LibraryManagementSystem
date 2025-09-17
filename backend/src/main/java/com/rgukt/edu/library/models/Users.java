package com.rgukt.edu.library.models;
import jakarta.persistence.*;

@Entity
@Table(name = "users") // table name in DB
public class Users {

    @Id
    @Column(unique = true)
    private String studentId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true) // email must be unique
    private String email;

    @Column(nullable = false)
    private String password;

//    @Enumerated(EnumType.STRING) // store enum as string (ADMIN/STUDENT)
    @Column(nullable = false)
//    private Role role;
    private String role;

    // Default constructor (needed by JPA)
    public Users() {}

    // Constructor
    public Users(String studentId,String name, String email, String password, String role) {
        this.studentId=studentId != null ? studentId.toUpperCase() : null;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;

    }

    // Getters and Setters
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId != null ? studentId.toUpperCase() : null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Enum for role
//    public enum Role {
//        ADMIN,
//        STUDENT
//    }
}


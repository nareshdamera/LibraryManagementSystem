package com.rgukt.edu.library.dto;

import com.rgukt.edu.library.models.Requests;

public class RequestDTO {
    private Long requestId;
    private String bookTitle;
    private String bookCode;
    private String status;
    private String studentId; // new field

    public RequestDTO(Requests request) {
        this.requestId = request.getRequestId();
        this.bookTitle = request.getBookTitle();
        this.bookCode = request.getBook().getBookCode();
        this.status = request.getStatus().name();
        this.studentId = request.getUser() != null ? request.getUser().getStudentId() : null; // safe check
    }

    // Getters
    public Long getRequestId() { return requestId; }
    public String getBookTitle() { return bookTitle; }
    public String getBookCode() { return bookCode; }
    public String getStatus() { return status; }
    public String getStudentId() { return studentId; } // getter for frontend
}

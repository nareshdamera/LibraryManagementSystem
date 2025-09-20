package com.rgukt.edu.library.controller;

import com.rgukt.edu.library.dto.RequestDTO;
import com.rgukt.edu.library.models.Requests;
import com.rgukt.edu.library.service.RequestsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/requests")
public class RequestsController {

    private final RequestsService requestsService;

    public RequestsController(RequestsService requestsService) {
        this.requestsService = requestsService;
    }

    // Fetch all requests
    @GetMapping
    public ResponseEntity<List<RequestDTO>> getAllRequests() {
        return ResponseEntity.ok(requestsService.getAllRequests());
    }

    // Update request status
    @PutMapping("/{requestId}/status")
    public ResponseEntity<?> updateRequestStatus(@PathVariable Long requestId,
                                                 @RequestBody StatusUpdateRequest body) {
        try {
            Requests updatedRequest = requestsService.updateRequestStatus(requestId, body.getStatus());
            return ResponseEntity.ok(new RequestDTO(updatedRequest));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // DTO for status update
    public static class StatusUpdateRequest {
        private Requests.Status status;
        public Requests.Status getStatus() { return status; }
        public void setStatus(Requests.Status status) { this.status = status; }
    }

    // Fetch requests by student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getRequestsByStudent(@PathVariable String studentId) {
        try {
            List<RequestDTO> requests = requestsService.getRequestsByStudentId(studentId);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Failed to fetch borrowed books"));
        }
    }
}

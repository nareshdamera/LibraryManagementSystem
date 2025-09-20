package com.rgukt.edu.library.service;

import com.rgukt.edu.library.dto.RequestDTO;
import com.rgukt.edu.library.models.Requests;
import com.rgukt.edu.library.repository.RequestsRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RequestsService {

    private final RequestsRepo requestsRepository;

    public RequestsService(RequestsRepo requestsRepository) {
        this.requestsRepository = requestsRepository;
    }

    public List<RequestDTO> getAllRequests() {
        return requestsRepository.findAll()
                .stream()
                .map(RequestDTO::new)
                .toList();
    }

    public Requests updateRequestStatus(Long requestId, Requests.Status status) {
        Requests request = requestsRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return requestsRepository.save(request);
    }

    @Transactional(readOnly = true) // Ensure lazy-loaded book fields are accessible
    public List<RequestDTO> getRequestsByStudentId(String studentId) {
        return requestsRepository.findByUser_StudentId(studentId)
                .stream()
                .map(RequestDTO::new)
                .toList();
    }
}

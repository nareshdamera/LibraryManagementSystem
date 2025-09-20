package com.rgukt.edu.library.repository;

import com.rgukt.edu.library.models.Requests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface RequestsRepo extends JpaRepository<Requests, Long> {
    List<Requests> findByUser_StudentId(String studentId);
}

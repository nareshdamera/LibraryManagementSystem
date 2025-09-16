package com.rgukt.edu.library.repository;

import com.rgukt.edu.library.models.Books;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BooksRepo extends JpaRepository<Books,Long> {
    Optional<Books> findById(Long id);
}

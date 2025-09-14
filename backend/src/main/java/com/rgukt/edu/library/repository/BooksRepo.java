package com.rgukt.edu.library.repository;

import com.rgukt.edu.library.models.Books;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BooksRepo extends JpaRepository<Books,Long> {

}

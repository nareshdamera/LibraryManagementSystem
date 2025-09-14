package com.rgukt.edu.library.repository;

import com.rgukt.edu.library.models.Requests;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestsRepo extends JpaRepository<Requests,Long> {

}

package com.rgukt.edu.library.repository;

import com.rgukt.edu.library.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepo extends JpaRepository<Users,Long> {
    Users findByEmail(String email);
}

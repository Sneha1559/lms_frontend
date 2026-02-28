package com.example.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.example.lms.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);   // optional but useful
}
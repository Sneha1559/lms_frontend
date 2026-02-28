package com.example.lms.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.lms.entity.Role;
import com.example.lms.entity.User;
import com.example.lms.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User login(String username, String password, Role role) {

        return userRepository.findByUsername(username)
                .filter(u -> u.getPassword().equals(password))
                .filter(u -> u.getRole() == role)
                .orElseThrow(() ->
                        new RuntimeException("Invalid credentials"));
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }
}
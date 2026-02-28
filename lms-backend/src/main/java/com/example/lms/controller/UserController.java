package com.example.lms.controller;

import com.example.lms.entity.User;
import com.example.lms.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public User register(@RequestBody User user) {
        return service.createUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return service.login(
                user.getUsername(),
                user.getPassword(),
                user.getRole()
        );
    }
    
    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }
}
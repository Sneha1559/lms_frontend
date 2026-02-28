package com.example.lms.controller;

import com.example.lms.entity.*;
import com.example.lms.exception.ResourceNotFoundException;
import com.example.lms.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequestMapping("/api/submissions")
@CrossOrigin
public class SubmissionController {

    private final SubmissionRepository repo;

    public SubmissionController(SubmissionRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Submission submit(@RequestBody Submission submission) {
        return repo.save(submission);
    }
}
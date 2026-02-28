package com.example.lms.controller;

import com.example.lms.entity.Assignment;
import com.example.lms.entity.Course;
import com.example.lms.entity.Notes;
import com.example.lms.exception.ResourceNotFoundException;
import com.example.lms.repository.AssignmentRepository;
import com.example.lms.repository.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/assignments")
@CrossOrigin
public class AssignmentController {

    private final AssignmentRepository repo;

    public AssignmentController(AssignmentRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/classroom/{classroomId}")
    public List<Notes> getByClassroom(@PathVariable Long classroomId) {
        return repo.findByClassroom_Id(classroomId);
    }
}
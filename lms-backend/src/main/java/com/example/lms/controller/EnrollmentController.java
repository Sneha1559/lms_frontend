package com.example.lms.controller;

import com.example.lms.entity.Enrollment;
import com.example.lms.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin
public class EnrollmentController {

    private final EnrollmentService service;

    public EnrollmentController(EnrollmentService service) {
        this.service = service;
    }

    @PostMapping("/join")
    public Enrollment join(@RequestBody Enrollment enrollment) {
        return service.join(enrollment);
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getByStudent(@PathVariable Long studentId) {
        return service.getByStudent(studentId);
    }
}
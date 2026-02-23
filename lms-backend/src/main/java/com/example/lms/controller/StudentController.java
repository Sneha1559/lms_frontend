package com.example.lms.controller;

import com.example.lms.entity.*;
import com.example.lms.exception.ResourceNotFoundException;
import com.example.lms.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public StudentController(EnrollmentRepository enrollmentRepository,
                             UserRepository userRepository,
                             CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    @PostMapping("/{studentId}/enroll/{courseId}")
    public ResponseEntity<Enrollment> enrollStudent(@PathVariable Long studentId,
                                                    @PathVariable Long courseId) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);

        return ResponseEntity.ok(enrollmentRepository.save(enrollment));
    }

    @GetMapping("/{studentId}/courses")
    public ResponseEntity<List<Enrollment>> getStudentCourses(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollmentRepository.findByStudentId(studentId));
    }
}
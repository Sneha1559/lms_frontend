package com.example.lms.controller;

import com.example.lms.entity.Assignment;
import com.example.lms.entity.Course;
import com.example.lms.exception.ResourceNotFoundException;
import com.example.lms.repository.AssignmentRepository;
import com.example.lms.repository.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final CourseRepository courseRepository;

    public AssignmentController(AssignmentRepository assignmentRepository,
                                CourseRepository courseRepository) {
        this.assignmentRepository = assignmentRepository;
        this.courseRepository = courseRepository;
    }

    @PostMapping("/course/{courseId}")
    public ResponseEntity<Assignment> createAssignment(@PathVariable Long courseId,
                                                       @RequestBody Assignment assignment) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        assignment.setCourse(course);
        return ResponseEntity.ok(assignmentRepository.save(assignment));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Assignment>> getAssignments(@PathVariable Long courseId) {
        return ResponseEntity.ok(assignmentRepository.findByCourseId(courseId));
    }
}
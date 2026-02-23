package com.example.lms.controller;

import com.example.lms.entity.Course;
import com.example.lms.entity.Syllabus;
import com.example.lms.exception.ResourceNotFoundException;
import com.example.lms.repository.CourseRepository;
import com.example.lms.repository.SyllabusRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/syllabus")
public class SyllabusController {

    private final SyllabusRepository syllabusRepository;
    private final CourseRepository courseRepository;

    public SyllabusController(SyllabusRepository syllabusRepository,
                              CourseRepository courseRepository) {
        this.syllabusRepository = syllabusRepository;
        this.courseRepository = courseRepository;
    }

    @PostMapping("/course/{courseId}")
    public ResponseEntity<Syllabus> uploadSyllabus(@PathVariable Long courseId,
                                                   @RequestBody Syllabus syllabus) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        syllabus.setCourse(course);
        return ResponseEntity.ok(syllabusRepository.save(syllabus));
    }
}
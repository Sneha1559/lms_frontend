package com.example.lms.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.lms.entity.Course;
import com.example.lms.service.CourseService;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "http://localhost:5173")
public class FacultyController {

    private final CourseService courseService;

    // 🔥 MANUAL CONSTRUCTOR
    public FacultyController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/{facultyId}/courses")
    public Course createCourse(@PathVariable Long facultyId,
                               @RequestBody Course course) {
        return courseService.createCourse(facultyId, course);
    }

    @GetMapping("/{facultyId}/courses")
    public List<Course> getCourses(@PathVariable Long facultyId) {
        return courseService.getFacultyCourses(facultyId);
    }
}
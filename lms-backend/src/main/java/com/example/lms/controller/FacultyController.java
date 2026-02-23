package com.example.lms.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.List;
import com.example.lms.entity.*;
import com.example.lms.service.*;

@RestController
@RequestMapping("/api/faculty")
@RequiredArgsConstructor
public class FacultyController {

    private final CourseService courseService = new CourseService();

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
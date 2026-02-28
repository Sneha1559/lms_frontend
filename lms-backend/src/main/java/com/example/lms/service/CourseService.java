package com.example.lms.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.lms.entity.Course;
import com.example.lms.entity.User;
import com.example.lms.repository.CourseRepository;
import com.example.lms.repository.UserRepository;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository,
                         UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public Course createCourse(Long facultyId, Course course) {
        User faculty = userRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        course.setFaculty(faculty);

        return courseRepository.save(course);
    }

    public List<Course> getFacultyCourses(Long facultyId) {
        User faculty = userRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        return courseRepository.findByFaculty(faculty);
    }
}
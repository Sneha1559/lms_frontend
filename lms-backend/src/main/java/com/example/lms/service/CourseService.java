package com.example.lms.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;
import com.example.lms.repository.*;
import com.example.lms.entity.*;
import com.example.lms.exception.*;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository = null;
    private final UserRepository userRepository = null;

    public Course createCourse(Long facultyId, Course course) {
        User faculty = userRepository.findById(facultyId)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty not found"));

        course.setFaculty(faculty);
        return courseRepository.save(course);
    }

    public List<Course> getFacultyCourses(Long facultyId) {
        return courseRepository.findByFacultyId(facultyId);
    }
}
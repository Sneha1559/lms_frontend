package com.example.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.lms.entity.Course;
import com.example.lms.entity.User;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByFaculty(User faculty);
}
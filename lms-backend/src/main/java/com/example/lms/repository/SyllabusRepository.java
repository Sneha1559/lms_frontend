package com.example.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.lms.entity.*;

import java.util.List;

public interface SyllabusRepository extends JpaRepository<Syllabus, Long> {
    Syllabus findByCourseId(Long courseId);
}

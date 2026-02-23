package com.example.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.lms.entity.*;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCourseId(Long courseId);
}
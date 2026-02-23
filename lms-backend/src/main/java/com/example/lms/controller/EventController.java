package com.example.lms.controller;

import com.example.lms.entity.Course;
import com.example.lms.entity.Event;
import com.example.lms.exception.ResourceNotFoundException;
import com.example.lms.repository.CourseRepository;
import com.example.lms.repository.EventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;
    private final CourseRepository courseRepository;

    public EventController(EventRepository eventRepository,
                           CourseRepository courseRepository) {
        this.eventRepository = eventRepository;
        this.courseRepository = courseRepository;
    }

    @PostMapping("/course/{courseId}")
    public ResponseEntity<Event> createEvent(@PathVariable Long courseId,
                                             @RequestBody Event event) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        event.setCourse(course);
        return ResponseEntity.ok(eventRepository.save(event));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Event>> getEvents(@PathVariable Long courseId) {
        return ResponseEntity.ok(eventRepository.findByCourseId(courseId));
    }
}
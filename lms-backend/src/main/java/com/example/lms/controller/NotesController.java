package com.example.lms.controller;

import com.example.lms.entity.Course;
import com.example.lms.entity.Notes;
import com.example.lms.exception.ResourceNotFoundException;
import com.example.lms.repository.CourseRepository;
import com.example.lms.repository.NotesRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NotesController {

    private final NotesRepository notesRepository;
    private final CourseRepository courseRepository;

    public NotesController(NotesRepository notesRepository,
                           CourseRepository courseRepository) {
        this.notesRepository = notesRepository;
        this.courseRepository = courseRepository;
    }

    @PostMapping("/course/{courseId}")
    public ResponseEntity<Notes> addNotes(@PathVariable Long courseId,
                                          @RequestBody Notes notes) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        notes.setCourse(course);
        return ResponseEntity.ok(notesRepository.save(notes));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Notes>> getNotes(@PathVariable Long courseId) {
        return ResponseEntity.ok(notesRepository.findByCourseId(courseId));
    }
}
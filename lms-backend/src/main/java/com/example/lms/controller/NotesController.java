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
@CrossOrigin
public class NotesController {

    private final NotesRepository repo;

    public NotesController(NotesRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/classroom/{classroomId}")
    public List<Notes> getByClassroom(@PathVariable Long classroomId) {
        return repo.findByCourse_Id(classroomId);
    }
}
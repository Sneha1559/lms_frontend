package com.example.lms.service;

import com.example.lms.entity.Enrollment;
import com.example.lms.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository repo;

    public EnrollmentService(EnrollmentRepository repo) {
        this.repo = repo;
    }

    public Enrollment join(Enrollment enrollment) {
        return repo.save(enrollment);
    }

    public List<Enrollment> getByStudent(Long studentId) {
        return repo.findByStudentId(studentId);
    }
}
package com.example.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.lms.entity.*;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
	List<Notes> findByClassroom_Id(Long classroomId);
}

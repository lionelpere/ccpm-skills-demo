package com.todoapp.controller;

import com.todoapp.dto.TaskRequest;
import com.todoapp.dto.TaskResponse;
import com.todoapp.service.JwtService;
import com.todoapp.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks(
            @RequestHeader("Authorization") String authHeader) {
        Long userId = getUserIdFromToken(authHeader);
        List<TaskResponse> tasks = taskService.getAllTasks(userId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody TaskRequest request) {
        Long userId = getUserIdFromToken(authHeader);
        TaskResponse task = taskService.createTask(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {
        Long userId = getUserIdFromToken(authHeader);
        TaskResponse task = taskService.updateTask(userId, id, request);
        return ResponseEntity.ok(task);
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TaskResponse> toggleTask(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {
        Long userId = getUserIdFromToken(authHeader);
        TaskResponse task = taskService.toggleTask(userId, id);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {
        Long userId = getUserIdFromToken(authHeader);
        taskService.deleteTask(userId, id);
        return ResponseEntity.noContent().build();
    }

    private Long getUserIdFromToken(String authHeader) {
        String token = authHeader.substring(7);
        return jwtService.getUserIdFromToken(token);
    }
}

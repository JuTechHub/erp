package com.erp.controller;

import com.erp.model.User;
import com.erp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Enable CORS for frontend
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        Map<String, Object> response = new HashMap<>();

        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null && user.getPassword().equals(password)) {
            response.put("status", "success");
            response.put("role", user.getRole());
            response.put("message", "Login successful");
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "role", user.getRole(),
                "fullName", user.getFullName() != null ? user.getFullName() : user.getUsername(),
                "employeeId", user.getEmployeeId() != null ? user.getEmployeeId() : ""
            ));
        } else {
            response.put("status", "error");
            response.put("message", "Invalid credentials");
        }
        return response;
    }
}

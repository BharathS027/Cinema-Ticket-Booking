package com.cinema.backend.controllers;

import com.cinema.backend.dto.LoginResponseDTO;
import com.cinema.backend.models.User;
import com.cinema.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // Registration endpoint
    @PostMapping("/api/v1/register")
    public ResponseEntity<String> registerUser(@RequestBody User newUser) {
        try {
            // Hash password before saving the user
            newUser.setPassword(userService.encodePassword(newUser.getPassword()));
            userService.saveUser(newUser);
            return ResponseEntity.ok("Registration successful!");
        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed. Please try again.");
        }
    }

    // Login endpoint
    @PostMapping("/api/v1/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody User loginRequest) {
        try {
            User user = userService.getUserByEmail(loginRequest.getEmail());

            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new LoginResponseDTO("Invalid credentials", null, null));
            }

            // Verify password match
            if (userService.isPasswordMatch(loginRequest.getPassword(), user.getPassword())) {
                LoginResponseDTO response = new LoginResponseDTO("Login successful", user.getName(), user.getId());
                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new LoginResponseDTO("Invalid credentials", null, null));
            }
        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new LoginResponseDTO("An error occurred during login", null, null));
        }
    }
}

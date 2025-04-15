package com.cinema.backend.services;

import com.cinema.backend.models.User;
import com.cinema.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // Register a new user
    public void saveUser(User user) {
        userRepository.save(user);
    }

    // Retrieve a user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Check if password matches the hashed password in DB
    public boolean isPasswordMatch(String rawPassword, String encodedPassword) {
        return bCryptPasswordEncoder.matches(rawPassword, encodedPassword);
    }

    // Encode password
    public String encodePassword(String rawPassword) {
        return bCryptPasswordEncoder.encode(rawPassword);
    }
}

package com.cinema.backend.dto;

public class LoginResponseDTO {

    private String message;
    private String name;
    private Long id;

    public LoginResponseDTO(String message, String name, Long id) {
        this.message = message;
        this.name = name;
        this.id = id;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

package com.example.demo.Model; // Ensure this matches your package structure

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class User { // Updated class name
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
@Column
    private String name;

    @Enumerated(EnumType.STRING) // Store as string in the database
    private Role role; // Enum for roles: ADMIN, CLIENT

    @Column
    private String email;
    @Column
    private String password; // Ensure to hash passwords before storing them

    @Column
    private LocalDateTime createdAt;
    @Column
    private LocalDateTime updatedAt;

    // Default constructor
    public User() {
        this.createdAt = LocalDateTime.now(); // Set creation time automatically
        this.updatedAt = LocalDateTime.now(); // Set update time automatically
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
        this.updatedAt = LocalDateTime.now(); // Update time when role changes
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
        this.updatedAt = LocalDateTime.now(); // Update time when email changes
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

package com.example.demo.Controller;

import com.example.demo.JwtUtil;
import com.example.demo.Model.User;
import com.example.demo.Service.UserService;


import ch.qos.logback.classic.Logger;

import org.hibernate.annotations.LazyGroup;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/admin/users")
public class UserController {
    
    @Autowired
    private AuthenticationManager authenticationManager;


    private static final Logger logger = (Logger) LoggerFactory.getLogger(UserController.class);

    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private UserService userService;
    

    // Create a new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }

    // Update a user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(id, userDetails);
        return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
    }

    // Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/test") 
    public String test(){
        return "test";
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String name = credentials.get("name");
        String password = credentials.get("password");
    
        // Authenticate the user
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(name, password)
        );
    
        // Fetch the user from the database
        User user = userService.findByName(name);
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid name or password");
        }
    
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getName());
    
        // Return token, role, and userId
        return ResponseEntity.ok(Map.of(
            "token", token,
            "role", user.getRole(), // Include user role
            "userId", user.getId()  // Include user ID
        ));
    }
    

    
    @PostMapping("/generate-token")
    public ResponseEntity<String> generateToken(@RequestBody Map<String, String> payload) {
        String name = payload.get("name"); // Use name instead of email
        String token = jwtUtil.generateToken(name); // Generate token using JwtUtil
        return ResponseEntity.ok(token); // Return token as response
    }
    

    
}

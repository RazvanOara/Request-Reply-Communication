package com.example.demo.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.Console;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final RestTemplate restTemplate; // Add RestTemplate field

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.restTemplate = restTemplate; // Inject RestTemplate
    }

    @Override
    public User createUser(User user) {
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setRole(userDetails.getRole());
            user.setPassword(userDetails.getPassword());
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);

            return user;
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        // Call the device microservice to delete devices associated with the use
        String deviceServiceUrl = "http://localhost:8080/api/admin/devices/user/" + id;
        restTemplate.delete(deviceServiceUrl); // Delete devices associated with the user

        userRepository.deleteById(id);
    }

    @Override
    public User findByName(String name) {
        System.out.println("Searching for user with name: " + name);
        User user = userRepository.findByName(name);
        if (user == null) {
            System.out.println("User not found in repository: " + name);
        } else {
            System.out.println("User found: " + user.getName() + ", email: " + user.getEmail());
        }
        return user;
    }
    

}

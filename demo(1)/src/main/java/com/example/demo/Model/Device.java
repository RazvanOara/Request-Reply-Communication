package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "devices") // Specify the name of the table in the database
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false) // Map to user_id column, not null
    private long userId;

    @Column(name = "description", nullable = false, length = 255) // Description field, not null, max length 255
    private String description;

    @Column(name = "address", nullable = false, length = 255) // Address field, not null, max length 255
    private String address;

    @Column(name = "max_hourly_consumption", nullable = false) // Max hourly consumption field, not null
    private double maxHourlyConsumption;

    // Constructors
    public Device() {}

    public Device(long userId, String description, String address, double maxHourlyConsumption) {
        this.userId = userId;
        this.description = description;
        this.address = address;
        this.maxHourlyConsumption = maxHourlyConsumption;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getMaxHourlyConsumption() {
        return maxHourlyConsumption;
    }

    public void setMaxHourlyConsumption(double maxHourlyConsumption) {
        this.maxHourlyConsumption = maxHourlyConsumption;
    }
}
